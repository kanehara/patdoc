# PatDoc

A simple SPA for patients and doctors to schedule appointments and
keep track of medical records

## Client

The client is build with the [Vue.js](https://vuejs.org/) framework.
Routing is implemented with [vue-router](https://router.vuejs.org/en/) and state management is implemented
with [vuex](https://vuex.vuejs.org/en/).  Assets are bundled using [Webpack](https://webpack.github.io/)

There is a dev server for serving the client locally.  This server can be started by
running:

```
    cd client
    npm install
    npm start
```

The dev server is run on `localhost:8080`

## Server

The client requires the server to be running for retrieving and modifying
app data.  To start the server:

```
    cd server
    npm install
    npm start
```

The server is run on `localhost:3000`

If developing, you can alternatively run `npm run start:dev` which does
the same as `npm start` except using `nodemon`.

***Note***: `nodemon` does not play nicely with Webpack HMR if Client is
running in dev mode

