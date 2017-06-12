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

### Vue Chrome Dev Tool

The Vue chrome dev tools [extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
allows for inspection of component and Vuex state.  It also
offers a great time travelling feature to relive state mutations.

## Server

The client requires the server to be running for retrieving and modifying
app data.  To start the server:

```
    cd server
    npm install
    npm start
```

The server is run on `localhost:3000`

The routes can be found in `src/routes`

## Nice to Have's

The following would be nice to have's that were not implemented
due to time constraints:

* Robust error handling when backend fails with reducer
actions for failure
* Mocha/chai node unit tests
* E2E tests
* Notifications for doctors and patients for new appointments
* Profile pictures
* Animations
* Sorting appointments by status, time, etc.
* Feature to schedule another appointment with past doctor