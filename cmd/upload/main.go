package main

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"gopkg.in/gographics/imagick.v3/imagick"
)

func main() {
	fmt.Println("vim-go")
	runServer()
	imagick.Initialize()
	defer imagick.Terminate()
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

	fmt.Printf("Uploaded a file: %s (%d): %+v", header.Filename, header.Size, header.Header)

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

	mw := imagick.NewMagickWand()
	defer mw.Destroy()
	mw.ReadImageFile(tempFile)
	imageType := mw.GetImageFormat()
	fmt.Printf("Magick said %s: (%d/%d), [%+v]", tempFile.Name(), mw.GetImageWidth(), mw.GetImageHeight(), imageType)

	// cols, rows, err := mw.GetSize()
	// if err != nil {
	// 	fmt.Printf("Imagick error")
	// 	return
	// }
	// fmt.Printf("Magick said (%d/%d)\n", cols, rows)

	fmt.Fprintf(w, "Uploaded file \"%s\" (%d/%d bytes):\n%+v\n%+v\n", header.Filename, fileBytes, header.Size, header.Header, attr)
}

func runServer() {
	http.HandleFunc("/upload", handleUploadFile)
	http.ListenAndServe(":8080", nil)
}
