# C4C Express Internal Backend

The goal is to eventually have this API exactly match the current Vert.x API so they can be interchanged without issue.

Currently there are only a few of the endpoints we want, but the ones so far show most of the capability of the current Vert.x backend:

- public and protected routes
- JWT signing and verification
- password verification and hasing with bcrypt

Currently missing:

- admin routes
- special protected routes (asking to mutate the user of THIS jwt)
- logout/jwt blacklisting (although I hope to do this better with redis caching)

# API Endpoints

- [signup](api.md/#post-signup)
- [login](api.md/#post-login)
- [logout](api.md/#post-login)
- [get all users](api.md/#get-protectedusers)

## `POST /signup`

Used for creating a user to be stored in the database.

### Authorization Requirements

None.

### Request Body

```json
{
  "email": STRING,
  "firstName": STRING,
  "lastName": STRING,
  "password": STRING,
  "currentYear": INTEGER,
  "major": STRING
}
```

### Responses

#### `201 OK`

User was successfully added to the database.

#### `400 BAD REQUEST`

The request body was malformed according to the specification.

## `POST /login`

Used for creating a user to be stored in the database.

### Authorization Requirements

None.

### Request Body

```json
{
  "email": "john.doe@email.com",
  "password": "password123"
}
```

### Responses

#### `201 OK`

Returns a JWT in response header under "Authorization" that expires in 60 minutes.

#### `400 BAD REQUEST`

The request body was malformed according to the specification.

## `GET /protected/users`

Used for getting a list of all users in the database.

### Authorization Requirements

Requires a valid JWT

### Responses

#### `200 OK`

Every thing is okay.

```json
[
  {
    "email": STRING,
    "firstName": STRING,
    "lastName": STRING,
    "currentYear": INTEGER,
    "major": STRING,
    "privilegeLevel": STRING
  },
  {
    "email": STRING,
    "firstName": STRING,
    "lastName": STRING,
    "currentYear": INTEGER,
    "major": STRING,
    "privilegeLevel": STRING
  }
]
```

#### `400 BAD REQUEST`

This happens if the client sends a request that does not conform to the standard

outlined above.

#### `401 UNAUTHORIZED`

Not sufficent authorization, either the JWT is invalid or does not have sufficent prvileges.
