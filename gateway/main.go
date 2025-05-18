package main

import "net/http"

func main(){

	newHandler := Newhandler()

	mux:=http.NewServeMux()
	newHandler.registerRoutes(mux)
}