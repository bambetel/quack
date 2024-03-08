// fake file upload server for testing components
// gets file + description from the requests and sends back a RANDOM response
// that contains a sample upload feedback
package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	addr := "127.0.0.1:8080"
	fmt.Println("Running upload server at", addr)
	runServer(addr)
}

var mockUploads = make(map[string]string, 32)

func handleUploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handleUploadFile()", r.Method)
	if r.Method == "DELETE" {
		writeJSON(w, http.StatusOK, map[string]string{
			"test": "value",
		})
		return
	}
	r.ParseMultipartForm(1 << 10) // upload size limit

	file, header, err := r.FormFile("uploadFile")
	if err != nil {
		fmt.Println("Error reading upload file.", err)
		writeJSON(w, http.StatusBadRequest, "Error reading file.")
		return
	}
	defer file.Close()

	fmt.Printf("Uploaded a file: %s (%d): %+v\n", header.Filename, header.Size, header.Header)

	attr := make(map[string]string)
	attr["type"] = "any"
	attr["size"] = fmt.Sprintf("%d", header.Size)
	attr["msg"] = fmt.Sprintf("Uploaded file \"%s\" (%d bytes):\n%+v\n%+v\n", header.Filename, header.Size, header.Header, attr)
	attr["url"] = "example.com/uploads/" + header.Filename
	attr["title"] = r.FormValue("title")
	mockUploads[header.Filename] = r.FormValue("title")
	writeJSON(w, http.StatusOK, attr)
}

// TODO: use some key to authorize deletion
// that expires after form submission
func handleFileDelete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if _, has := mockUploads[id]; !has {
		writeJSON(w, http.StatusNotFound, nil)
	}

	delete(mockUploads, id)
	writeJSON(w, http.StatusNoContent, nil)
}

func handleFileDeleteOptions(w http.ResponseWriter, r *http.Request) {
	h := w.Header()
	h.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
	h.Add("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE")
	writeJSON(w, http.StatusOK, nil)
}

func runServer(addr string) {
	r := chi.NewRouter()
	r.Post("/upload", handleUploadFile)
	r.Options("/upload/{id}", handleFileDeleteOptions) // for CORS
	r.Delete("/upload/{id}", handleFileDelete)
	http.ListenAndServe(addr, r)
}

func writeJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.Header().Add("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}
