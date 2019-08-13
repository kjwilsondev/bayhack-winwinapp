# BAYHACK - WIN\WIN APPLICATION

---

## Scripts 📖

To run the site use *npm run dev* or *npm server*

```json
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

## CSS 🖌

Used [materialize](https://materializecss.com/) for styling

./client/public/index.html

```html
<!-- Materialize CSS -->
<!-- Compiled and minified CSS -->
<!-- Located inside the head tag -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<!-- Compiled and minified JavaScript -->
<!-- Located inside the body tag -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
```

Used [material icons](https://material.io/resources/icons/?style=baseline) for icons

./client/public/index.html

```html
<!-- Material Icons CSS -->
<!-- Compiled and minified CSS -->
<!-- Located inside the head tag -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Packages 📦

### Backend - Node.js

* **bcryptjs**:
  * used to hash passwords before we store them in our database
* **body-parser**:
  * used to parse incoming request bodies in a middleware
* **concurrently**:
  * allows us to run our backend and frontend concurrently and on different ports
* **express**:
  * sits on top of Node to make the routing, request handling, and responding easier to write
* **is-empty**:
  * global function that will come in handy when we use validator
* **jsonwebtoken**:
  * used for authorization
* **mongoose**:
  * used to interact with MongoDB
* **passport**:
  * used to authenticate requests, which it does through an extensible set of plugins known as strategies
* **passport-jwt**:
  * passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
* **validator**:
  * used to validate inputs (e.g. check for valid email format, confirming passwords match)

### Frontend - React.js

* **axios**:
  * promise based HTTP client for making requests to our backend
* **classnames**:
  * implements conditional classes in our JSX for:
  * conditional styling
* **jwt-decode**:
  * decodes our jwt so we can get user data from it
* **react-redux**:
  * allows us to use Redux which handles data on client side
* **react-router-dom**:
  * is the DOM bindings for React Router
  * contains the router components
* **redux**:
  * used to manage state between components (can be used with React or any other view library)
* **redux-thunk**:
  * middleware for Redux that allows us to directly access the dispatch method to make asynchronous calls from our actions

## Passport

### ExtractJwt Methods

For taking a JSON Web Token. This module has functions for extracting certain pieces or all of the JWT

```js
fromHeader(header_name)
```

creates a new extractor that looks for the JWT in the given http header

```js
fromBodyField(field_name)
```

creates a new extractor that looks for the JWT in the given body field. You must have a body parser configured in order to use this method.

```js
fromUrlQueryParameter(param_name)
```

creates a new extractor that looks for the JWT in the given URL query parameter.

```js
fromAuthHeaderWithScheme(auth_scheme)
```

creates a new extractor that looks for the JWT in the authorization header, expecting the scheme to match auth_scheme.

```js
fromAuthHeaderAsBearerToken()
```

creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'

```js
fromExtractors([array of extractor functions])
```

creates a new extractor using an array of extractors provided. Each extractor is attempted in order until one returns a token.

## Testing with Postman

### Testing Apply

* Set the request type to **POST**
* Set the request url to **<http://localhost:5000/api/users/apply>**
* Navigate to the **Body** tab
* Select **x-www-form-urlencoded**
* Fill in your **registration parameters**
  * for Apply: name, email, password, password2
* Send

### Testing Login

* Set the request type to **POST**
* Set the request url to **<http://localhost:5000/api/users/login>**
* Navigate to the **Body** tab
* Select **x-www-form-urlencoded**
* Fill in your **registration parameters**
  * for Apply: email, password
* Send
