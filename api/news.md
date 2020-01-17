## `GET /news`

Used for getting a list of public information about all news in the database.

### Authorization Requirements

None.

### Responses

#### `200 OK`

Returns the list of events as a JSON array

```json
[
  {
    "_id": STRING,
    "title": STRING,
    "description": STRING,
    "author": STRING,
    "datePublished": DATE,
    "content": STRING,
    "imageUrl": STRING,
    "createdAt": DATE,
    "updatedAt": DATE,
    "__v": INTEGER
  }
]
```

**DATE** is in the form YYYY-MM-DDTHH:MM:SS.mmmZ, or the result of a Javascript Date object .toJSON()
Example: new Date().toJSON() -> "2020-01-17T03:25:49.315Z"

#### `400 BAD REQUEST`

The request body was malformed according to the specification, the specifics are explained in the response body.

```json
"Error: ERROR"
```

## `GET /news/:id`

Used for getting a single news post in the database by ID.

### Authorization Requirements

None.

### Responses

#### `200 OK`

Returns the a JSON object representing an event

```json
{
  "_id": STRING,
  "title": STRING,
  "description": STRING,
  "author": STRING,
  "datePublished": DATE,
  "content": STRING,
  "imageUrl": STRING,
  "createdAt": DATE,
  "updatedAt": DATE,
  "__v": INTEGER
}
```

**DATE** is in the form YYYY-MM-DDTHH:MM:SS.mmmZ, or the result of a Javascript Date object .toJSON()
Example: new Date().toJSON() -> "2020-01-17T03:25:49.315Z"

#### `400 BAD REQUEST`

The request body was malformed according to the specification, the specifics are explained in the response body.

```json
"Error: ERROR"
```

## `POST /news`

Used for creating an news post to be stored in the database.

### Authorization Requirements

Requires privilege level 1.

### Request Body

```json
{
  "title": STRING,
  "description": STRING,
  "author": STRING,
  "datePublished": DATE,
  "content": STRING,
  "imageUrl": STRING
}
```

**DATE** is in the form YYYY-MM-DDTHH:MM:SS.mmmZ, or the result of a Javascript Date object .toJSON()
Example: new Date().toJSON() -> "2020-01-17T03:25:49.315Z"

### Responses

#### `201 OK`

News post was successfully added to the database.

#### `400 BAD REQUEST`

The request body was malformed according to the specification, the specifics are explained in the response body.

```json
"Error: ERROR"
```

#### `401 UNAUTHORIZED`

The request does not contain sufficient authorization, the specifics are explained in the response body

```json
"Error: ERROR"
```

## `PUT /news/:id`

Used for updating a news post to be stored in the database by ID.

### Authorization Requirements

Requires privilege level 1.

### Request Body

```json
{
  "title": STRING,
  "description": STRING,
  "author": STRING,
  "datePublished": DATE,
  "content": STRING,
  "imageUrl": STRING
}
```

**DATE** is in the form YYYY-MM-DDTHH:MM:SS.mmmZ, or the result of a Javascript Date object .toJSON()
Example: new Date().toJSON() -> "2020-01-17T03:25:49.315Z"

### Responses

#### `201 OK`

News post was successfully updated and saved to the database.

#### `400 BAD REQUEST`

The request body was malformed according to the specification, the specifics are explained in the response body.

```json
"Error: ERROR"
```

#### `401 UNAUTHORIZED`

The request does not contain sufficient authorization, the specifics are explained in the response body

```json
"Error: ERROR"
```

## `DELETE /news/:id`

Used for deleting a single event in the database by ID.

### Authorization Requirements

None.

### Responses

#### `200 OK`

News post was successfully deleted from the database.

#### `400 BAD REQUEST`

The request body was malformed according to the specification, the specifics are explained in the response body.

```json
"Error: ERROR"
```

#### `401 UNAUTHORIZED`

The request does not contain sufficient authorization, the specifics are explained in the response body

```json
"Error: ERROR"
```
