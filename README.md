# C4C Express Internal Backend


## Install
```sh
git clone https://github.com/rymaju/c4c-express-internal-backend.git

npm install
```

If not already done, ask for the ATLAS_URI from me (Ryan Jung), create your own MongoDB cluster on Atlas, or install MongoDB locally.

If needed, create new local SSL certificates with this command:

```sh
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 1000
```
This will generate a cert.pem and key.pem needed for HTTPS. Chrome and other browsers will give a warning when you connect, but it can be ignored. 

Create a .env file in the root folder with the URI for your mongoDB connection and the passphrase for the SSL certificate like so:

```sh
ATLAS_URI=
SSL_PASSPHRASE=
```

## Run

```sh
npm start
```

The API will be live at `https://localhost:8443`