# Running the Website Locally

## Installation

### React (client)

```
npm install react-bootstrap bootstrap
npm install axios
npm install react-router-dom@6
```

### Node (server)

```
npm i express
npm install firebase
npm install cors
```

### Firebase (database)

```
npm install firebase
```

### Nodemon (to automatically restarting the node application when file changes in the directory are detected)

```
npm install --save-dev nodemon
```

## To Run

### Node (server)

```
npm start
```

### React (client)

```
cd booking-sys
npm start
```

# Development (Reference only from this point onwards)

### React

1.  Create react app

```
>Hotel_Booking_System npx create-react-app booking_sys
```

2.  React components in /components folder
3.  React Router links in App.js, which is served by server

# Error

if you meet this error: 'react-scripts' is not recognized as an internal or external command, operable program or batch file.
run

```
npm update
```

### Node

## installation

1.  Create a package.json file which will allow us to keep track of all the app scripts and manage dependencies that Node app needs

```
npm init -y
npm i express
mkdir server
```

2.  Add index.js file and use PORT 3001

3.  Go to package.json and add this under scripts

```
 "scripts": {
    "start": "node server/index.js"
  },
```

into booking-sys/package.json add this to allow React make requests to Node server

```
  "proxy": "http://localhost:3001",
```

4.  The server is served on "http://localhost:3001"
5.  server/index.js contains all of API routes to call from frontend
6.  firebase.js is used to make any database queries. It is imported to server/index.js for backend usage

# React and Node Together

1. run Node and React App
2. set API in server/index.js and add a respond message through res.json({message: ""})
3. To get the respond data from server, make an HTTP GET request using useEffect/onClick functions and fetch data from the API endpoint to frontend
4. Store the data into a state variable and use it in React components

# Firebase

1.  Create firebase console project
2.  get the config file and add it into server folder
3.  firebase_config.js is the config file in this project

### References

1.  https://blog.logrocket.com/user-authentication-firebase-react-apps/
2.  https://medium.com/wesionary-team/how-to-setup-authentication-using-node-server-and-firebase-cloud-functions-a1fb176a134f
