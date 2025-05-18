package main

import "net/http"

type handler struct{

}

func Newhandler() *handler{
	return &handler{}
}

func (h *handler) registerRoutes(mux *http.ServeMux){
	mux.HandleFunc("POST /api/customers/{customerID}/orders",h)
}