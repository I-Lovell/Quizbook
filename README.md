# Quizbook

## Description

Quizbook is a social media application that is themed around trivia questions.

### Background

In this project, we started with a lean, existing application as we worked 
to **improve and extend** it over a two week period. A significant part of 
this challenge was to familiarise yourself with the codebase we inherited. 
Another part of the challenge was working in separate frontend and backend 
teams writing different languages: JavaScript (React) and Golang.

### Structure

This repo contains two applications:

- A frontend React App
- A backend api server

These two applications communicates through HTTP requests, passing JSON
data between each other, and need to be run separately.

HAVE A LIST OF LANGUAGE, FRAMEWORKS, AND ADDED LIBRARIES/DEPENDENCIES HERE:
e.g. Added dependencies to use Zod for Authentication and React-Hook-Form

### Features

- Users can create an account and delete their own account
- Users can log in using an account and log out from an account
- Users can view and edit their profile, including uploading a new profile 
picture and editing their bio
- Users can view other users' accounts
- Users can create, view, update, and delete posts
- Users can like and unlike posts
- Users can create, view, and delete comments on posts
- Access tokens and token validation
- A seed file to populate the database with data that demonstrates all the features
- Frontend form submission validation (e.g. passwords, correctly filled posts etc.)
- Error handling
- Tests for both the frontend and backend applications

### Out of Scope Features

LIST HERE

### Video demo

PUT A SCREEN RECORDING OF A RUN THROUGH OF THE SITE HERE

### Documentation

[Documentation of our applications can be found here.](./docs)

There is documentation for both the [frontend](./docs/frontend_routes) and the [backend](./docs/api_routes),
as well as documentation for the starter codebase, and the overall application at the end of the project.

### Card wall

We developed this project with an agile approach.

Link to our Trello board:
https://trello.com/b/WVKeI5oP


## Installation

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Install Go

Follow the instructions here: https://go.dev/doc/install

### Set up your project

1. Fork this repository
2. Rename the fork
3. Clone the fork to their local machine
4. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   go get .
   ```
5. Start Postgresql

   ```
   brew services start postgresql
   ```

6. Create your databases:
   ```
   createdb <DB_NAME>
   createdb <DB_NAME>_test
   ```

### Setting up environment variables.

We need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="http://localhost:8082"
```

#### Backend

Create a file `api/.env` with the following contents:

```
POSTGRES_URL="postgresql://localhost:5432/acebook"
JWT_SECRET="secret"
```

For an explanation of these environment variables, see the documentation.

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; go run main.go
```
To start the server application and seed the database at the same time:

```
; cd api
; go run main.go seed
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to the
`http://localhost:5173` to get to the homepage and start exploring the application.


## Authors and acknowledgment

This project was created by:

[Abbie Finlayson](https://github.com/abbiefinlayson1)  
[Luke Howeth](https://github.com/LukeHoweth)  
[Alister Ko](https://github.com/alistershko)  
[Etienne Le Goater](https://github.com/Elegoater)  
[Imogen Lovell](https://github.com/I-Lovell)  
[Emily Sadler](https://github.com/EmiSadler)


Under the guidance of our coaches at [Makers Academy](https://github.com/makersacademy):  
Kerry Finch  
[John Forster](https://github.com/JohnForster)
