# C4C Express Internal Backend

The goal is to eventually have this API exactly match the current Vert.x API so they can be interchanged without issue.

Currently there are only a few of the endpoints we want, but the ones so far show most of the capability of the current Vert.x backend:

- public and protected routes
- JWT signing and verification
- password verification and hashing with bcrypt
- logout/jwt blacklisting

Currently missing:

- CRUD news routes
- Update and delete on users

# Examples

The backend is hosted live at `https://c4c-heroku-internal-backend.herokuapp.com/`.

To access endpoints, send a request in the form `{HTTPHEADER} https://c4c-heroku-internal-backend.herokuapp.com/{route}`.

For example to get all users we would: `GET https://c4c-heroku-internal-backend.herokuapp.com/users`.

For endpoints that require a request body, we attach it to our request in the form of JSON.

For endpoints that require authorization, we attach our JWT to the request header `Authorization` in the form `Bearer: {token}`

# API Endpoints

## Login & Users

- [signup](api/login&users.md/#post-signup)
- [login](api/login&users.md/#post-login)
- [logout](api/login&users.md/#post-login)
- [get all users](api/login&users.md/#get-users)
- [get a single user by ID](api/login&users.md/#get-usersid)

## Events

- [get all events](api/events.md/#get-events)
- [get a single event by ID](api/events.md/#get-eventsid)
- [create a single event by ID](api/events.md/#post-eventsid)
- [update a single event by ID](api/events.md/#put-eventsid)
- [delete a single event by ID](api/events.md/#delete-eventsid)
