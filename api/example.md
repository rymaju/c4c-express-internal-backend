## `HEADER /route`

Concise one sentence description of what this route is for.

### Authorization Requirements

None || Requires privilege level 0 || Requires privilege level 1.

### Request Body

```json
{
  "key": TYPE,
  "key": TYPE,
  "key": TYPE
}
```

### Responses

#### `201 OK`

Operation was successful. If there is JSON response then it is shown below.

```json
{
  "key": TYPE,
  "key": TYPE,
  "key": TYPE
}
```

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
