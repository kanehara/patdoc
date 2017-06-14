# PatDoc

A simple SPA for patients and doctors to schedule appointments and
keep track of medical records

## Client

The client is build with the [Vue.js](https://vuejs.org/) framework.
Routing is implemented with [vue-router](https://router.vuejs.org/en/) and state management is implemented
with [vuex](https://vuex.vuejs.org/en/).  Assets are bundled using [Webpack](https://webpack.github.io/)

### Setup

#### 1. Install and start client dev server

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

The server serves a REST api for the Client to retrieve data

### Set up

#### 1. Server bootup

```
    cd server
    npm install
    npm start
```

The server is run on `localhost:3000`

The routes can be found in `src/routes`

#### 2. Mongo bootup

Server data is persisted in a Mongo Docker container.

Please create a directory at `/tmp/mongodb` which is where the mongo
volume will be mounted on the computer.

To create and run the docker container run in the `server` directory:

```
    npm run db:create
```

***Note:*** This requires docker to be installed on the machine

***Note:*** This should only run once or else docker will complain that the
container already exists

This will pull and start a mongo container named `patdocdb` and should
only have to be ran once to pull down and start the container.

To start and stop the mongo container afterwards run the following respectively:

```
    npm run db:start
    npm run db:stop
```

The docker mongo container is accessible at `localhost:27017`

### Medical record files

File uploads are stored on the local computer in `/tmp/patdoc/patient/:patientId/medicalRecord/:fileId`.
Where `:patientId` is the patient's ID and `:fileId` is a UUID for the medical record file.
Ideally, files would eventually be stored in Mongo with GridFs.

***NOTE: Links to local files do not open due to a security block by browsers,
they can be opened by copying link and manually opening in new page***

## Nice to Have's

The following would be nice to have's that were not implemented
due to time constraints:

* JWT tokens to authenticate requests to API
* Robust error handling when backend fails with reducer actions for failure.
At the moment everything is optimistic
* Mocha/chai node unit tests
* E2E tests
* Notifications for doctors and patients for new appointments
* Profile pictures
* Animations
* Sorting appointments by status, time, etc.
* Feature to schedule another appointment with past doctor
* Editing personal info