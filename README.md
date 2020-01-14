# C4C Express Internal Backend

## Motivation

Making this in Express and with MongoDB has a few key benefits that make backend development faster and cleaner

- npm packages help abstract complex behavior and reduce code bloat in this repo
- running with node and nodemon means that there is essentially **no** compile time. You are never wasting time waiting to see your changes
- Javascript becomes the language for frontend and backend, collaboration could become easier
- MongoDB/Mongoose has easier to read schemas and is super simple to set up, you dont need to download any local database software just run `npm start` and it will connect to MongoDB Atlas automatically. (admittedly switching to mongoose means we lose use migrations, which are super helpful for versioning and keeping track of very strict schemas. but MongoDB is **suppposed** to be flexible and agile and generally schema-less and so migrations become an unnessesary antipattern. If we *really* want migrations we can add a mongoDB migrations npm package later.)
- Most importantly, its fun to write

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
npm start
```

The API will be live at `https://localhost:8443`
