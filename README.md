# C4C Express Internal Backend

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