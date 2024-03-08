package main

import (
	"fmt"
	"net/http"
	"os"
	"text/template"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	wd, _ := os.Getwd()
	fmt.Println("Current dir:", wd)
	fs := http.FileServer(http.Dir("./web"))

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	// r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
	// 	id := chi.URLParam(r, "id")
	// 	tmp := template.Must(template.ParseFiles("web/templates/tmp1.html"))
	// 	tmp.Execute(w, struct{ Title, Content string }{fmt.Sprintf("Title (%s)", id), "test"})
	// })
	r.Handle("/static/*", http.StripPrefix("/static/", fs))
	r.Get("/accordion", func(w http.ResponseWriter, r *http.Request) {
		tmp := template.Must(template.ParseFiles("web/templates/accordion.html"))
		data := AccordionData{
			Title: "Accordion Title",
			Items: []AccordionItem{
				{"Duck", "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."},
				{"Goose", "Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident."},
				{"Swan", "Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod."},
				{"Merganser", "Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."},
			},
		}
		tmp.Execute(w, data)
	})
	r.Get("/check", func(w http.ResponseWriter, r *http.Request) {
		tmp := template.Must(template.ParseFiles("web/templates/checklist.html"))
		data := []ChecklistItem{
			{"1", "Duck"},
			{"2", "Goose"},
			{"3", "Swan"},
			{"4", "Ruddy shelduck"},
			{"5", "Merganser"},
			{"6", "Goosander"},
		}
		tmp.Execute(w, ChecklistData{"test", "Very Important Checklist", 2, 2, data})
	})
	r.Get("/radio", func(w http.ResponseWriter, r *http.Request) {
		tmp := template.Must(template.ParseFiles("web/templates/jumboradio.html"))
		data := []RadioListItem{
			{"1", "Duck", "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."},
			{"2", "Goose", "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."},
			{"3", "Swan", ""},
		}
		tmp.Execute(w, RadioListData{"test", "Your Favourite Waterfowl:", data})
	})
	http.ListenAndServe(":3000", r)
}

type AccordionData struct {
	Name  string // HTML form name for the list
	Title string // list title (fieldset legend)
	Items []AccordionItem
}

type AccordionItem struct {
	Label, Details string
}

type ChecklistData struct {
	Name           string // HTML form name for the list
	Title          string // list title (fieldset legend)
	NumMin, NumMax int    // n selected, 0,0 - no constraints
	Items          []ChecklistItem
}

type ChecklistItem struct {
	Id, Label string
}

type RadioListData struct {
	Name  string // HTML form name for the list
	Title string // list title (fieldset legend)
	Items []RadioListItem
}

type RadioListItem struct {
	Id, Label, Description string
}

func init() {

}
