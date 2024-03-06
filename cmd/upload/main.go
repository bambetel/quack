// fake file upload server for testing components
// gets file + description from the requests and sends back a RANDOM response
// that contains a sample upload feedback
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	addr := "127.0.0.1:8080"
	fmt.Println("Running upload server at", addr)
	runServer(addr)
}

func handleUploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handleUploadFile()")
	r.ParseMultipartForm(1 << 10) // upload size limit

	file, header, err := r.FormFile("uploadFile")
	if err != nil {
		fmt.Println("Error reading upload file.", err)
		writeJSON(w, http.StatusBadRequest, "Error reading file.")
		return
	}
	defer file.Close()

	fmt.Printf("Uploaded a file: %s (%d): %+v", header.Filename, header.Size, header.Header)

	attr := make(map[string]string)
	attr["type"] = "any"
	attr["size"] = fmt.Sprintf("%d", header.Size)
	attr["msg"] = fmt.Sprintf("Uploaded file \"%s\" (%d bytes):\n%+v\n%+v\n", header.Filename, header.Size, header.Header, attr)
	attr["url"] = "example.com/uploads/" + header.Filename
	attr["title"] = r.FormValue("title")
	writeJSON(w, http.StatusOK, attr)
}

func runServer(addr string) {
	http.HandleFunc("/upload", handleUploadFile)
	http.ListenAndServe(addr, nil)
}

func writeJSON(w http.ResponseWriter, status int, v any) error {
	// w.WriteHeader(status)
	w.Header().Add("Content-Type", "application/json")
	w.Header().Add("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
	return json.NewEncoder(w).Encode(v)
}
