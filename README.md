# Cinephile Backend

Backend API for Cinephile streaming app. Frontent repo [link](https://github.com/rohannY/Cine-Phile.git)

## Usage

Rename `.env.env` to `.env` and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Demo

Extensive documentation with examples [here](https://documenter.getpostman.com/view/21091542/2s9Xy2MrRq)

## Variables

| Key   | Value              | Type   |
| ----- | ------------------ | ------ |
| url   | localhost:7000/api | string |
| token | <jwt_token>        | string |

**_Headers:_**

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

## Endpoints

- [Authentication](#authentication)
  1. [Register](#1-register)
  1. [Login](#2-login)
  1. [Forgot Password](#3-forgot-password)
  1. [Reset Password](#4-reset-password)
  1. [Get user name](#5-get-user-name)
- [Admin](#admin)
  1. [Post Movie](#1-post-movie)
  1. [Update Movie](#2-update-movie)
  1. [Delete Movie](#3-delete-movie)
- [Movies](#movies)
  1. [Get all movies](#1-get-all-movies)
  1. [Get single movie](#2-get-single-movie)

---

## Authentication

Authentication endpoints

### 1. Register

Register as a user

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/auth/register
```

**_Body:_**

```json
{
  "name": "Test user 01",
  "email": "test01@gmail.com",
  "password": "1234"
}
```

### 2. Login

User login endpoint

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/auth/login
```

**_Body:_**

```js
{
    "email":"test@mail.com",
    "password":"1234"
}
```

### 3. Forgot Password

Forgot password endpoint provide email to reset account password

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/auth/forgot-password
```

**_Body:_**

```js
{
    "email":"test@mail.com"
}
```

### 4. Reset Password

Endpoint link will be sent to email id user registered with.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:7000/api/auth/reset-password/644b644d410dc6397f0e0a60/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImkubS52aWdobmVzaDczM0BnbWFpbC5jb20iLCJpZCI6IjY0NGI2NDRkNDEwZGM2Mzk3ZjBlMGE2MCIsImlhdCI6MTY4MjcwODE1MiwiZXhwIjoxNjgyNzA4NzUyfQ.dir11SBHLMPyq5pXIuR3ZHoiLkTdZAJ1wRG4TqnVRXQ
```

**_Body:_**

```js
{
    "password":"1234"
}
```

### 5. Get user name

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/auth/user/644b643c410dc6397f0e0a5e
```

## Admin

All routes are protected
Admin is a super user who has complete access to perform CRUD operations on user, movies.

### 1. Post Movie

Create new movie.

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{url}}/admin/movie
```

**_Body:_**

| Key         | Value                                                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | Phir Hera Pheri                                                                                                                                                                    |
| overview    | A twist of fate changes the lives of Raju, Shyam and Baburao when they get cheated by a fraudster. They must now find another way to repay the loan taken from a dreaded gangster. |
| poster      | <poster_link>                                                                                                                                                                      |
| language    | hi                                                                                                                                                                                 |
| popularity  | 10                                                                                                                                                                                 |
| movie       | <movie_link>                                                                                                                                                                       |
| cast[0]     | Akshay Kumar                                                                                                                                                                       |
| cast[1]     | Sunil Shetty                                                                                                                                                                       |
| cast[2]     | Paresh Rawal                                                                                                                                                                       |
| genres[0]   | Comedy                                                                                                                                                                             |
| genres[1]   | Crime                                                                                                                                                                              |
| keywords[0] | money                                                                                                                                                                              |
| keywords[1] | scam                                                                                                                                                                               |
| keywords[2] | friendship                                                                                                                                                                         |

### 2. Update Movie

Update movie data

**_Endpoint:_**

```bash
Method: PUT
Type: FORMDATA
URL: {{url}}/admin/movie/644582c031b9b1c608ada912
```

**_Body:_**

| Key    | Value         | Description         |
| ------ | ------------- | ------------------- |
| poster | <poster_link> | any value to update |

### 3. Delete Movie

Remove movie from database

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/admin/movie/644587039606cc5fe95ba707
```

## Movies

Movies endpoint will fetch movies/movie from database based on the request

### 1. Get all movies

Fetches all movies or movies based on search query.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/movies
```

**_Query params:_**

| Key    | Value    | Description  |
| ------ | -------- | ------------ |
| search | avengers | search query |

### 2. Get single movie

Single movie fetch

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/movies/644582c031b9b1c608ada912
```

---

[Back to top](#cinephile-backend)
