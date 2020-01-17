# C4C Express Internal Backend

The goal is to eventually have this API exactly match the current Vert.x API so they can be interchanged without issue.

Currently there are only a few of the endpoints we want, but the ones so far show most of the capability of the current Vert.x backend:

- public and protected routes
- JWT signing and verification
- password verification and hashing with bcrypt
- logout/jwt blacklisting
- CRUD for news and events

Currently missing:

- Update and delete on users (including application data)

# Examples

The backend is hosted live at `https://c4c-heroku-internal-backend.herokuapp.com/`.

To access endpoints, send a request in the form `{HTTPHEADER} https://c4c-heroku-internal-backend.herokuapp.com/{route}`.

For example to get all users we would: `GET https://c4c-heroku-internal-backend.herokuapp.com/users`.

For endpoints that require a request body, we attach it to our request in the form of JSON.

For endpoints that require authorization, we attach our JWT to the request header `Authorization` in the form `Bearer {token}`

Authorization is one of

- None: does not require a JWT in the Authorization header, essentially a public endpoint
- Privilege level 0: requires a JWT (valid logged in user) but does not expect any extra privileges
- Privilege level 1: requires a JWT (valid logged in user) and also requires that the token has privilege level 1, which can be thought of as admin access (read/write to important things like events)

# API Endpoints

## Login & Users

- [signup](api/login&users.md/#post-signup)
- [login](api/login&users.md/#post-login)
- [logout](api/login&users.md/#post-logout)
- [get all users](api/login&users.md/#get-users)
- [get a single user by ID](api/login&users.md/#get-usersid)

## Events

- [get all events](api/events.md/#get-events)
- [get a single event by ID](api/events.md/#get-eventsid)
- [create a single event](api/events.md/#post-events)
- [update a single event by ID](api/events.md/#put-eventsid)
- [delete a single event by ID](api/events.md/#delete-eventsid)
- [attend an event by event code](api/events.md/#post-eventscheckincode)

## News

- [get all news posts](api/news.md/#get-news)
- [get a single news post by ID](api/news.md/#get-newsid)
- [create a single news post](api/news.md/#post-news)
- [update a single news post by ID](api/news.md/#put-newsid)
- [delete a single news post by ID](api/news.md/#delete-newsid)
