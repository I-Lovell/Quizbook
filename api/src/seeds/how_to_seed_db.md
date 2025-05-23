# How to reseed the Database

You can reseed the database using a command line argument. When you do, it will both reseed the database and start running the backend server. Here's how to do it!

## WARNING

Running this command will drop all tables in the database! Do not use it if you have data you want to keep! 

## Instructions

1. Make sure you're in the "api" directory in your terminal
2. Run `go run main.go seed`

You should then be able to see a list of confirmation messages in your terminal as each piece of data is created, for example:

`Sucessfully created user: coolcat`

If you enter the wrong command after `go run main.go`, nothing happens to the database. There will be an error message in the terminal output that says:

`INCORRECT COMMAND LINE ARGUMENT, did you mean 'seed'?`

If this happens stop the server with "ctrl+c" and re-enter the command from step two.
