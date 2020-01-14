# C4C Express Internal Backend

## Motivation

Making this in Express and with MongoDB has a few key benefits that make backend development faster and cleaner

### Pros

- npm packages help abstract complex behavior and reduce code bloat in this repo
- running with node and nodemon means that there is essentially **no** compile time. You are never wasting time waiting to see your changes which was a really annoying issue with the Vertx version.
- Javascript becomes the language for frontend and backend, collaboration could become easier
- MongoDB/Mongoose has easier to read schemas and is super simple to set up, you dont need to download any local database software just run `npm start` and it will connect to MongoDB Atlas automatically.
- Most importantly, its fun to write

### Cons

- Switching to mongoose means we lose use migrations, which are super helpful for versioning and keeping track of very strict schemas. but MongoDB is **suppposed** to be flexible and agile and generally schema-less and so migrations become unnessesary. If we _really_ want migrations we can add a mongoDB migrations npm package later.

## [API Documentation](api.md)

## Install

```sh
git clone https://github.com/rymaju/c4c-express-internal-backend.git

npm install
```

~~If not already done, ask for the ATLAS_URI from me (Ryan Jung), create your own MongoDB cluster on Atlas, or install MongoDB locally.~~

Just kidding, for now the .env and URI are in the repo because its private anyway.

If needed, create new local SSL certificates with this command:

```sh
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 1000
```

This will generate a cert.pem and key.pem needed for HTTPS. Chrome and other browsers will give a warning when you connect, but it can be ignored.

~~Create a .env file in the root folder with the URI for your mongoDB connection and the passphrase for the SSL certificate like so:~~

```sh
ATLAS_URI=
SSL_PASSPHRASE=
```

Just kidding, for now the .env and URI are in the repo because its private anyway.

## Run

```sh
npm run dev
```

or if in production

```sh
npm start
```

The difference is that `npm run dev` uses nodemon to automatically restart the server when changes are detected, very useful for development.

The API will be live at `https://localhost:8443`
