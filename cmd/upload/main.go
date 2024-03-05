package main

import (
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"net/http"
	"os"

	_ "golang.org/x/image/webp"
)

func main() {
	fmt.Println("vim-go")
	runServer()
}

func handleUploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handleUploadFile()")
	r.ParseMultipartForm(1 << 10) // upload limit

	file, header, err := r.FormFile("uploadFile")
	if err != nil {
		fmt.Println("Error reading upload file.", err)
		return
	}
	defer file.Close()

	fmt.Printf("Uploaded a file: %s (%d): %+v\n", header.Filename, header.Size, header.Header)

	tempFile, err := os.CreateTemp("tmp-upload", "upload-*")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	fileBytes, err := io.Copy(tempFile, file)
	if err != nil {
		fmt.Println(err)
	}

	attr := make(map[string]string)
	attr["type"] = "any"

	err = handleImage(file)
	if err != nil {
		fmt.Printf("Error handling image: %v\n", err)
	}

	fmt.Fprintf(w, "Uploaded file \"%s\" (%d/%d bytes):\n%+v\n%+v\n", header.Filename, fileBytes, header.Size, header.Header, attr)
}

func handleImage(f io.Reader) error {
	fmt.Println("handleImage()")
	m, name, err := image.Decode(f)
	if err != nil {
		return err
	}
	bounds := m.Bounds()
	w := bounds.Dx()
	h := bounds.Dy()

	fmt.Printf("handleImage(): %d X %d, %s\n%+v\n", w, h, name, m.Bounds())
	return nil
}

func runServer() {
	http.HandleFunc("/upload", handleUploadFile)
	http.ListenAndServe(":8080", nil)
}
