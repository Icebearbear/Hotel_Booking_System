# Running the Website Locally

## Installation

Only client installation is inside /booking-sys, while the rest are installed outside of /booking-sys

### React (client)

```
npm install react-bootstrap bootstrap
npm install axios
npm install react-router-dom@6
```

### Node (server)

```
npm i express
npm intall dotenv --save
```

### Firebase (database)

```
npm install firebase
npm install cors
```

### Stripe (payment service)

```
npm install --save stripe
```

### Dotenv (hiding sensitive information in .env file)

```
npm install dotenv --save
```

### Nodemon (to automatically restarting the node application when file changes in the directory are detected)

```
npm install --save-dev nodemon
```

## To Run

Run both server and client in two different terminals at the same time. Only by running both the application works as intended because client and server needs to communicate and both needs to be running

### Node (server)

```
npm start
```

### React (client)

```
cd booking-sys
npm start
```

# Testing (Jest)

at /HOTEL_BOOKING_SYSTEM dir

## Installation

```
npm i --save-dev jest supertest
```

## Add dependencies (already added in this branch)

1.  add "test" line under "scripts" like this in package.json

```
    "scripts": {
    "start": "nodemon server/index.js",
    "test": "jest --forceExit --detectOpenHandles  --watchAll --maxWorkers=1"  },
```

2.  Additionally, add these lines in package.json after "scripts": {},

```
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ]
  },
```

3.  In server/index.js, the app.listen() (most bottom line) is change to this not let jest listen to that port.

```
if (process.env.NODE_ENV !== "test") {
    console.log(`Server is listening on ${PORT}`);
  });
}
```

## Things to add

1.  Create a .env file that contains SKIP_PREFLIGHT_CHECK=true in /booking-sys
2.  Go back to /HOTEL_BOOKING_SYSTEM dir
3.  There is a "**tests**" folder that jest will read from
4.  Add test file inside that folder. Name the file name as FILE_NAME.test.js

## Run Tests with Jest

at /HOTEL_BOOKING_SYSTEM dir

1. Run npm start first to run the server and let it run during testing
2. Open another terminal in /HOTEL_BOOKING_SYSTEM dir, run

```
npm test
```

## Important notes about Jest

These are afew issues after installing Jest like stated above:

1. babel-jest dependency error when npm start in /booking-sys to serve react. This is due to another jest lib inside react itself.
2. Solution for issue in no.1 : uninstall jest in root dir
3. It is okay for now because once backend testing using jest is done, the Jest in this dir can be removed before doing frontend testing

# Development (Reference only from this point onwards)

## React

1.  Create react app

```
>Hotel_Booking_System npx create-react-app booking_sys
```

2.  React components in /components folder
3.  React Router links in App.js, which is served by server

## Node

### installation

1.  Create a package.json file which will allow us to keep track of all the app scripts and manage dependencies that Node app needs

```
npm init -y
npm i express
mkdir server
```

2.  Add index.js file and use PORT 3001

3.  Go to package.json and add this under scripts into booking-sys/package.json add this to allow React make requests to Node server

```
 "scripts": {
    "start": "node server/index.js"
  },
```

```
  "proxy": "http://localhost:3001",
```

4.  The server is served on "http://localhost:3001"
5.  server/index.js contains all of API routes to call from frontend
6.  firebase.js is used to make any database queries. It is imported to server/index.js for backend usage

## React and Node Together

1. run Node and React App
2. set API in server/index.js and add a respond message through res.json({message: ""})
3. To get the respond data from server, make an HTTP GET request using useEffect/onClick functions and fetch data from the API endpoint to frontend
4. Store the data into a state variable and use it in React components

## Firebase

1.  Create firebase console project
2.  get the config file and add it into server folder
3.  firebase_config.js is the config file in this project

## Dotenv file

1.  create .env file in root folder and add key value pairs in each line
2.  require('dotenv').config() in the file you want to use the .env data
3.  read with process.env.VARIABLE_NAME
4.  this way, the sensitive data in .env will be protected when shared to public

## Stripe

1.  Stripe is used for checkout page for bank details verification purpose
2.  Checkout page is redirected from CustomerInformation page
3.  Upon successful checkout, user is redirected back to the website Success page
4.  Else, redirect to Cancel page

Testing Stripe in checkout page:

1.  Fill out the payment details with the test card information:
    - Enter 4242 4242 4242 4242 as the card number.
    - Enter any future date for card expiry.
    - Enter any 3-digit number for CVC.
    - Enter any billing postal code.
2.  Click Pay.
3.  You’re redirected to success page.

### Local storage

- USER_DB_ACCOUNT = {first_name: "", last_name: "", email:"", uid:"", dbdocId:""} - contains user account in db
- USER_ID = {""} - contains user uid in db, stored in login page for booking purpose
- HOTEL_BOOKING_INFO = infoObject in CustometInformation page - to keep data before checkout and use it after checkout is successful

## Error

if you meet this error: 'react-scripts' is not recognized as an internal or external command, operable program or batch file.
run

```
npm update
```

## References

1.  [Firebase Authentication](https://blog.logrocket.com/user-authentication-firebase-react-apps/)
2.  [Firebase Authentication in Node](https://medium.com/wesionary-team/how-to-setup-authentication-using-node-server-and-firebase-cloud-functions-a1fb176a134f)
3.  [Stripe Chekout Page](https://stripe.com/docs/payments/accept-a-payment)
4.  [Stripe Checkout Page API info](https://stripe.com/docs/api/prices/object)
