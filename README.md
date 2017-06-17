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
only be run once to pull down and start the container.

`db:create` will also run `npm run db:init` which populates the database with 10 patients and
3 doctors with the following credentials:

```
# Patients

pencilvester@test.com:pencil
morty@test.com:jessica
rick@test.com:schwifty
beth@test.com:horses
jerry@test.com:apples
birdperson@test.com:phoenix
summer@test.com:top
gearhead@test.com:clockwork
watert@test.com:icet
tammy@test.com:bird

# Doctors

doc@test.com:marty
hans@test.com:zimmer
sanchez@test.com:c137

```

The full script can be found in `src/db-script/init`

The mongo container can be started and stopped with te following:

```
    npm run db:start
    npm run db:stop
```

The docker mongo container is accessible at `localhost:27017`

### Medical record files

File uploads are stored on the local computer in `/tmp/patdoc/patient/:patientId/medicalRecord/:fileId`.
Where `:patientId` is the patient's ID and `:fileId` is a UUID for the medical record file.
Ideally, files would eventually either be stored in Mongo with GridFs and streamed
to the user or stored on a server.

***NOTE: Links to local files do not open due to a security block by browsers,
they can be opened by copying link and manually opening in new page***

## Nice to Have's

The following would be nice to have's that were not implemented
due to time constraints:

* Robustness
    * Robust error handling and reducers when backend fails. At the moment most things are optimistic
    * Protected API endpoints
    * Mongo discriminator model for Doctor and Patient models
    * Mocha/chai node unit tests
    * E2E tests
    * Store medical records in Mongo with GridFS or on remote server
* Features
    * Notifications for doctors and patients for new appointments
    * Feature to schedule another appointment with past doctor
    * Editing personal info
    * Better appointment sorting