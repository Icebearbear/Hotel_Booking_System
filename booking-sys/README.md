# React

## Installation

#### create react app

```
>Hotel_Booking_System npx create-react-app booking_sys
```

#### [Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/) css frame work

```
npm install react-bootstrap bootstrap
```

### Axios

to make HTTP requests from Nodejs API

```
npm install axios
```

### React Router

```
npm install react-router-dom@6
```

## To Run React

```
cd boking_sys
npm start
```

# Error

if you meet this error: 'react-scripts' is not recognized as an internal or external command, operable program or batch file.
run

```
npm update
```

# Node

## installation

create a package.json file which will allow us to keep track of all the app scripts and manage dependencies that Node app needs

```
npm init -y
npm i express
mkdir server
```

add index.js file and use PORT 3001

go to package.json and add this under scripts

```
 "scripts": {
    "start": "node server/index.js"
  },
```

into booking-sys/package.json add this to allow React make requests to Node server

```
  "proxy": "http://localhost:3001",
```

## To run Node

```
npm start
```

# React and Node Together

1. run Node
2. run React app
3. set API in server/index.js and add a respond message through res.json({message: ""})
4. To get the respond data from server, make an HTTP GET request using useEffect and fetch data from the endpoint
5. Store the data into a state variable and use it in React components

# Firebase

## installation

```
npm install firebase
```

```
npm install cors
```

[reference](https://blog.logrocket.com/user-authentication-firebase-react-apps/)
https://medium.com/wesionary-team/how-to-setup-authentication-using-node-server-and-firebase-cloud-functions-a1fb176a134f
