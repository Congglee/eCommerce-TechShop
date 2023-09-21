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
- [🐞 Bugs](#bugs)
- [Features in Development](#features-in-development)
- [📸 Screenshots](#screenshots)
- [Author](#author)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal

```
#  --- .env  ---

VITE_APP_API_URL =
VITE_APP_LIMIT_PRODUCT_PER_PAGE =
VITE_APP_LIMIT_ADMIN_USER_PER_PAGE =
VITE_APP_SECRET_KEY =
VITE_APP_MCETINY =
```

```bash
$ cd client

#  if you use yarn
$ yarn add (to install client-side dependencies)
$ yarn dev (to start the client)

$ npm install (to install client-side dependencies)
$ npm run dev (to start the client)
```

In the second terminal

- cd server and Set environment variables in .env
- Create your mongoDB connection url, which you'll use as your MONGODB_URL
- Supply the following credentials

```
#  --- .env  ---

PORT = 8080
JWT_SECRET =

CLOUDINARY_NAME =
CLOUDINARY_KEY =
CLOUDINARY_SECRET =

MONGODB_URL_LOCAL =
MONGODB_URL =

CLIENT_URL =
SERVER_URL =

LOCAL_URL =
DEPLOY_URL =

EMAIL_APP_PASSWORD =
EMAIL_NAME =

STRIPE_KEY =
```

```
# --- Terminal ---

$ npm install (to install server-side dependencies)
$ npm run dev (to start the server)
```

## Key Features

1. **User Management:** Register, log in, log out, and verify email addresses.
2. **Password Management:** Reset and change passwords with email verification.
3. **Authentication and Authorization:** Secure access with JWT Tokens.
4. **Shopping Cart:** Add, modify, remove, and clear products in the cart.
5. **Product Discovery:** Search, filter, paginate, and sort products by various criteria.
6. **User Interaction:** Leave comments and reviews on products.
7. **Checkout and Payment:** Create orders, pay with Stripe, and manage orders.
8. **Account Management:** Update user information and avatars.
9. **Admin Features:** Admin panel for managing users, categories, products, brands, orders, and viewing statistics and earnings.
10. **Media Upload:** Upload photos for avatars and product images.
11. **Form Validation:** Ensure data accuracy and completeness.

## Technologies used

This project was created using the following technologies.

#### Frontend

- [ReactJS](https://react.dev/) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [Redux Toolkit](https://redux-toolkit.js.org/) - Efficient state management and updates
- [react-router-dom](https://reactrouter.com/en/main) - Handling dynamic routing and component rendering
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - A part of Redux Toolkit, simplifying API calls and data fetching
- [Tailwindcss](https://tailwindcss.com/) - For User Interface
- [React Redux](https://react-redux.js.org/) - Manage application state efficiently and provide a more structured mechanism for managing data
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) - To display interactive and responsive notifications (toasts) in web applications
- [react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/docs/intro) - Cool spinners for ReactJS application
- [sweetalert2](https://sweetalert2.github.io/) - Creating attractive pop-up notifications and modals
- [React Slick](https://react-slick.neostack.com/) - Designing responsive image sliders or carousels
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Persistently storing application state
- [React Icons](https://react-icons.github.io/react-icons) - Integrating icons into React components
- [jwt-decode](https://github.com/auth0/jwt-decode) - Decoding JSON Web Tokens (JWTs)
- [crypto-js](https://github.com/brix/crypto-js) - Providing cryptographic functions for data security
- [react-hook-form](https://www.react-hook-form.com/) - Efficiently manage and validate forms in React applications
- [use-react-router-breadcrumbs](https://github.com/icd2k3/use-react-router-breadcrumbs#readme) - Generate breadcrumb navigation for React Router routes
- [flowbite](https://flowbite.com/) - Streamline web development with a UI library for building responsive interfaces
- [query-string](https://github.com/sindresorhus/query-string) - Parsing and formatting URL query strings in JavaScript
- [recharts](https://recharts.org/en-US/guide/getting-started) - Recharts is a React-based charting library for creating interactive data visualizations
- [dompurify](https://github.com/cure53/DOMPurify) - Sanitize and clean HTML content to prevent security vulnerabilities, especially in user-generated content
- [moment](https://momentjs.com/) - Parsing, formatting, and manipulating dates and times in JavaScript, making it easier to work with date-related operations

#### Backend

- [Node js](https://nodejs.org/en/) - A runtime environment to help build fast server applications using JS
- [Express js](https://expressjs.com/) - The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [jsonwebtoken](https://jwt.io/) - Used for authentication by generating and verifying JSON Web Tokens
- [cookie-parser](https://github.com/expressjs/cookie-parser) - Middleware for managing cookies in Node.js web applications
- [cors](https://github.com/expressjs/cors) - Middleware providing Cross-Origin Resource Sharing (CORS) support
- [Dotenv](https://github.com/motdotla/dotenv) - Zero Dependency module that loads environment variables
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
- [nodemailer](https://nodemailer.com/) - A module for Node.js applications to allow easy email sending.
- [uniqid](https://github.com/adamhalasz/uniqid/) - Generate unique IDs for elements in JavaScript applications
- [moment](https://momentjs.com/) - Parsing, formatting, and manipulating dates and times in JavaScript, making it easier to work with date-related operations
- [@babel/cli](https://babeljs.io/docs/babel-cli) - Command-line interface for Babel, a JavaScript compiler
- [@babel/core](https://babel.dev/docs/babel-core) - Core of Babel, responsible for transforming code
- [@babel/preset-env](https://babeljs.io/docs/babel-preset-env) - Babel preset for transforming modern JavaScript to be compatible with target environments
- [@babel/runtime](https://babel.dev/docs/babel-runtime) - Babel runtime for sharing helper code across transformed modules
- [babel-preset-minify](https://github.com/babel/minify) - Babel preset for minifying JavaScript code

#### Database

- [MongoDB](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections

## Bugs

- Animation is run when the component is rendered or re-rendered

## Features in Development

- Create cart api
- Improve website performance
- Prevent users spam submit sending API requests

> - fix bugs of old features

## Screenshots

#### Home Page

![homepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328212/extends/homepage_ahh31x.png)

![homepagewithprofile](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328206/extends/homepagewithprofile_o7wrf6.png)

---

#### Products Page

![productspage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328209/extends/productspage_p8oazz.png)

![productspage2](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328209/extends/productspage2_puwupt.png)

---

#### Product Detail Page

![productdetailpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328208/extends/productdetailpage_zlny0s.png)

![productdetailcomment](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328150/extends/productdetailcomment_w7cqrz.png)

---

#### Login Page

![loginpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328208/extends/loginpage_rl61wx.png)

---

#### Register Page

![registerpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328207/extends/registerpage_wcydqg.png)

---

#### Cart Page

![cartpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328207/extends/cartpage_z8luza.png)

---

#### Checkout Info Page

![checkoutinfopage_aijrhn](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328738/extends/DIGITAL_WORLD_2_22.09.2023_03_37_yhhlgb.png)

---

#### Checkout Payment Page

![checkoutpaymentpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328771/extends/DIGITAL_WORLD_2_22.09.2023_03_39_xfe8ba.png)

---

#### Checkout Stripe Payment Page

![checkoutstripepaymentpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328205/extends/checkoutstripepaymentpage_qrtajm.png)

---

#### Checkout Success Page

![checkoutsuccesspage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328204/extends/checkoutsuccesspage_c8fg5l.png)

---

#### Profile Page

![profilepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328999/extends/DIGITAL_WORLD_2_22.09.2023_03_42_qoqdw0.png)

---

#### Profile Order Detail Page

![profileorderdetailpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695329080/extends/DIGITAL_WORLD_2_22.09.2023_03_44_nzwzrr.png)

---

#### Profile Edit Page

![profileeditpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695329168/extends/DIGITAL_WORLD_2_22.09.2023_03_45_ibxbqs.png)

---

#### Admin DashBoard Page

![admindashboardpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328202/extends/admindashboardpage_rkcgue.png)

---

#### Admin Category Manage Page

![admincategorymanageppage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328201/extends/admincategorymanageppage_zs5x0t.png)

---

#### Admin Create Category Page

![admincreatecategorypage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328200/extends/admincreatecategorypage_r1sw9x.png)

---

#### Admin Update Category Page

![adminupdatecategorypage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328199/extends/adminupdatecategorypage_jvats7.png)

---

#### Admin Product Manage Page

![adminproductmanagepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328199/extends/adminproductmanagepage_intx9m.png)

---

#### Admin Create Product Page

![admincreateproductpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328199/extends/admincreateproductpage_e8r3vs.png)

---

#### Admin Update Product Page

![adminupdateproductpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328199/extends/adminupdateproductpage_pnlc2z.png)

---

#### Admin User Manage Page

![adminusermanagapage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328199/extends/adminusermanagapage_astj6g.png)

---

#### Admin Update User Page

![adminupdateuserpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328199/extends/adminupdateuserpage_cwivuh.png)

---

#### Admin Order Manage Page

![adminordermanagepage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328198/extends/adminordermanagepage_xs8gxe.png)

---

#### Admin Update Order Page

![adminupdateorderpage](https://res.cloudinary.com/di3eto0bg/image/upload/v1695328151/extends/adminupdateorderpage_x29x4u.png)

## Author

- Github: [Congglee](https://github.com/Congglee)
- Email: [congldqn888@gmail.com](congldqn888@gmail.com)
