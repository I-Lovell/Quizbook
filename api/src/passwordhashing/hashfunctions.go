package passwordhashing

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

//This function encrypts passwords using bcrypt
//It prints an error to the terminal if the encryption fails
//Note: bcrypt can olny encrypt up to 72 bytes!
func HashPasswords(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		fmt.Println("HASH FAILED! ", err)
	}
	return string(bytes)
}

//This compares the password the user supplies at login to it's hash
//"CompareHashAndPassword" returns nil if the hash and password match
//Therefore this function returns true if this is the case and false otherwise
func VerifyPassword(hash, password string) bool  {
	convertPassword := []byte(password)
	convertHash := []byte(hash)
	passwordverified := bcrypt.CompareHashAndPassword(convertHash, convertPassword) 
	if passwordverified != nil {
		fmt.Println(passwordverified.Error())
	}
	return passwordverified == nil
}