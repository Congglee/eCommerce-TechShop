import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { cartProducts } = req.body;
  const selectedFields = cartProducts.map(
    ({ _id, name, price, thumb, cartQuantity }) => ({
      _id,
      name,
      price,
      thumb,
      cartQuantity,
    })
  );

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(selectedFields),
    },
  });

  const line_items = req.body.cartProducts.map((item) => {
    return {
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
          images: [item.thumb],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: Math.floor(item.price / 100),
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "VN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "vnd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "vnd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout/payment`,
    locale: "auto",
  });

  return res.status(200).json({ url: session.url });
});

const createOrderForStripe = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);
  const products = items.map((item) => ({
    product: item._id,
    count: item.cartQuantity,
  }));

  const timestamp = data.created;
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  const address = data.customer_details.address;
  const addressComponents = [
    address.city,
    address.line1,
    address.line2,
    address.state,
    address.country,
  ];

  const formattedAddress = addressComponents
    .filter((component) => component)
    .join(", ");

  const newOrder = new Order({
    products: products,
    total: data.amount_total * 100,
    payment_status: "Đã thanh toán",
    delivery_status: "Đang xử lý",
    date: formattedDate,
    address: formattedAddress,
    mobile: data.customer_details.phone,
    orderBy: customer.metadata.userId,
    payment: "Thanh toán qua cổng Stripe",
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (error) {
    console.log(error);
  }
};

// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret =
//   "whsec_370c6d62576784bc272f7ab4653da40076e0e69370bdd44f81b168833cc303e1";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("Webhook verified.");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          // console.log("data:", data);
          createOrderForStripe(customer, data);
        })
        .catch((err) => console.log(err.message));
    }

    res.send().end();
  }
);

export default router;
