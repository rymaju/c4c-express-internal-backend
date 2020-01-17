# C4C Express Internal Backend

The goal is to eventually have this API exactly match the current Vert.x API so they can be interchanged without issue.

Currently there are only a few of the endpoints we want, but the ones so far show most of the capability of the current Vert.x backend:

- public and protected routes
- JWT signing and verification
- password verification and hasing with bcrypt
- logout/jwt blacklisting

Currently missing:

- CRUD news routes
- Update and delete on users

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
- [get all events](api/events.md/#put-eventsid)
- [get all events](api/events.md/#delete-eventsid)
