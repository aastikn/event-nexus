package main

import (
	"Server/routes"
	"net/http"
)

func main() {
	http.ListenAndServe(":8080", routes.NewRouter())
}
