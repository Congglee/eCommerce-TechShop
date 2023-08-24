<H1 align ="center" > TechShop (MERN ECOMMERCE)  </h1>
<h5  align ="center"> 
Fullstack open source ecommerce application made with MongoDB, Express, React & Nodejs (MERN) </h5>
<br/>

- [Configuration and Setup](#configuration-and-setup)
- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [📸 Screenshots](#screenshots)
- [Features in Development](#features-in-development)
- [Author](#author)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal

```bash
$ cd client

#  if you use yarn
$ yarn install (to install client-side dependencies)
$ yarn dev (to start the client)

$ npm install (to install client-side dependencies)
$ npm run dev (to start the client)
```

In the second terminal

- cd server and Set environment variables in .env
- Create your mongoDB connection url, which you'll use as your MONGO_URL
- Supply the following credentials

```
#  --- .env  ---

MONGODB_URL =
PORT = 8080

CLOUDINARY_NAME =
CLOUDINARY_KEY =
CLOUDINARY_SECRET =

JWT_SECRET =
STRIPE_KEY =

CLIENT_URL = your-local-client-url
```

```
# --- Terminal ---

$ npm install (to install server-side dependencies)
$ npm run dev (to start the server)
```

## Key Features

- User registration, login and logout
- Authentication/Authorization using JWT Tokens
- Add Product to Cart
- Change products's quantity in the cart
- Remove product from cart
- Clear Cart
- Search products by name
- Filter products by category, price range (greater than or equal to and less than or equal to)
- Product pagination
- Sort products by price, name, rating
- Comments and product reviews
- Checkout and create new orders
- Pay for orders via Stripe
- Client-side order management
- Update account information
- Form validation

<br/>

## Technologies used

This project was created using the following technologies.

#### Frontend

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [Redux Toolkit](https://redux-toolkit.js.org/) - Efficient state management and updates
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Handling dynamic routing and component rendering
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - A part of Redux Toolkit, simplifying API calls and data fetching
- [Tailwindcss](https://tailwindcss.com/) - For User Interface
- [React Redux](https://react-redux.js.org/) - Manage application state efficiently and provide a more structured mechanism for managing data
- [React Toastify](https://www.npmjs.com/package/react-toastify) - To display interactive and responsive notifications (toasts) in web applications
- [sweetalert2](https://sweetalert2.github.io/) - Creating attractive pop-up notifications and modals.
- [React Slick](https://react-slick.neostack.com/) - Designing responsive image sliders or carousels
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Persistently storing application state
- [React Icons](https://react-icons.github.io/react-icons) - Integrating icons into React components
- [jwt-decode](https://github.com/auth0/jwt-decode) - Decoding JSON Web Tokens (JWTs)
- [crypto-js](https://github.com/brix/crypto-js) - Providing cryptographic functions for data security

#### Backend

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used for authentication by generating and verifying JSON Web Tokens
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Middleware for managing cookies in Node.js web applications
- [cors](https://www.npmjs.com/package/cors) - Middleware providing Cross-Origin Resource Sharing (CORS) support
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [nodemon](https://nodemon.io/) - Development utility for Node.js applications, automating server restarts during development
- [cloudinary](https://cloudinary.com/documentation) - Cloud-based media management platform for storing, managing, and delivering images and videos
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library for hashing passwords securely
- [crypto-js](https://github.com/brix/crypto-js) - JavaScript library for cryptography and data security
- [mongoose-slug-generator](https://github.com/Kubide/mongoose-slug-generator) - Mongoose plugin for generating slugs for URLs
- [multer](https://github.com/expressjs/multer) - Middleware for handling file uploads in Node.js
- [multer-storage-cloudinary](https://github.com/affanshahid/multer-storage-cloudinary) - Multer storage engine for Cloudinary, facilitating direct uploads to Cloudinary.
- [slugify](https://github.com/simov/slugify) - Library for creating URL-friendly slugs from strings
- [stripe](https://stripe.com) - Payment processing platform for online transactions
- [joi](https://github.com/hapijs/joi) - Library for data validation in JavaScript applications
- [@babel/cli](https://babeljs.io/docs/babel-cli) - Command-line interface for Babel, a JavaScript compiler
- [@babel/core](https://babel.dev/docs/babel-core) - Core of Babel, responsible for transforming code
- [@babel/preset-env](https://babeljs.io/docs/babel-preset-env) - Babel preset for transforming modern JavaScript to be compatible with target environments
- [@babel/runtime](https://babel.dev/docs/babel-runtime) - Babel runtime for sharing helper code across transformed modules
- [babel-preset-minify](https://github.com/babel/minify) - Babel preset for minifying JavaScript code

#### Database

- [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections

## Screenshots

![homepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692911406/ecommerce-techshop/homepage-techshop_m4gidc.png)

---

![homepage2](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912643/ecommerce-techshop/homepage2-techshop_cizdud.png)

---

![productspage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912643/ecommerce-techshop/productpage-techshop_holmi2.png)

---

![productdetailpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912643/ecommerce-techshop/productdetailpage-techshop_qq8r8z.png)

---

![loginpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912642/ecommerce-techshop/loginpage-techshop_pjchw9.png)

---

![registerpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912642/ecommerce-techshop/registerpage-techshop_lskwsu.png)

---

![cartpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912643/ecommerce-techshop/cartpage-techshop_o75shb.png)

---

![checkoutinfopage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912641/ecommerce-techshop/checkoutinfopage-techshop_se7rke.png)

---

![checkoutpaymentpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912641/ecommerce-techshop/checkoutpaymentpage-techshop_nlhyht.png)

---

![checkoutpaymentstripepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912641/ecommerce-techshop/checkoutstripe-techshop_iptbxq.png)

---

![checkoutsuccesspage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912644/ecommerce-techshop/checkoutsuccesspage-techshop_cyqpls.png)

---

![profilepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912642/ecommerce-techshop/profilepage-techshop_mzsbjb.png)

---

![profileditpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912641/ecommerce-techshop/profileeditpage-techshop_vbya4e.png)

---

![profilorderdetailpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1692912641/ecommerce-techshop/profileorderdetailpage-techshop_r3wz1i.png)

---

![dropdowmenu](https://res.cloudinary.com/di3eto0bg/image/upload/v1692914917/ecommerce-techshop/dropdowmenu-techshop_szcdsq.jpg)

---

![dropdowmenu2](https://res.cloudinary.com/di3eto0bg/image/upload/v1692914917/ecommerce-techshop/dropdowmenu2-techshop_esqxrw.jpg)

---

![comment](https://res.cloudinary.com/di3eto0bg/image/upload/v1692914917/ecommerce-techshop/comment-techshop_yu74o2.png)

---

![rating](https://res.cloudinary.com/di3eto0bg/image/upload/v1692914919/ecommerce-techshop/rating-techshop_exlnfq.png)

## Features in Development

- Responsive website
- Add loader effect
- Create cart api
- Admin Side for manage product, category, account, order, ...
- Register an account with email verification
- Forgot password, reset password (use Refresh Token)

> - fix bugs of old features

## Author

- Github: [Congglee](https://github.com/Congglee)
- Email: [congldqn888@gmail.com](congldqn888@gmail.com)
