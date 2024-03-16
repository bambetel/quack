class ImageUploader extends HTMLElement {
	feedback = document.createElement("p");

	constructor() {
		super();
	}

	connectedCallback() {
		this.component = this;
		// TODO WHY this doesn't remove component children?
		// while (this.firstChild) {
		// 	this.removeChild(this.lastChild);
		// }
		const shadow = this.attachShadow({ mode: "open" });
		this.list = document.createElement("ol");
		const list = this.list;

		const label = document.createElement("label");
		const fileInput = document.createElement("input");
		const sheet = new CSSStyleSheet();

		sheet.replaceSync(`
			img {
				max-width:  100px;
				max-height: 100px;
			}
			.dragover {
				outline:3px dashed blue;
			}
			.dropzone {
				border:2px solid gray;
				border-radius:10px;
			}
			.dropzone .placeholder {
				color: gray;
				background-color: lightgray;
			}
			.file-item:not(:first-of-type){
				border-top:2px solid gray;
			}
			`);
		shadow.adoptedStyleSheets = [sheet];
		fileInput.setAttribute("type", "file");
		fileInput.setAttribute("multiple", "");
		list.classList.add("dropzone")
		list.innerHTML = `<div class="placeholder">+ Drag and drop files here.</div>`;
		list.addEventListener("drop", (e) => {
			e.preventDefault()
		})

		label.innerText = "Uploaded files:";
		shadow.appendChild(label);
		shadow.appendChild(list);

		fileInput.addEventListener("change", (e) => {
			console.log("File count:", e.target.files.length);
			for (let i = 0; i < e.target.files.length; i++) {
				let f = e.target.files[i];
				console.dir("File:", f);

				this.handleAddFile(f);
			}
			e.target.value = null;
		})

		this.addEventListener("dragover", (e) => {
			e.preventDefault();
			console.log("if: dragover")
			list.classList.add("dragover")
		});
		this.addEventListener("dragleave", noDragStyle);
		this.addEventListener("mouseleave", noDragStyle);
		function noDragStyle(e) {
			console.log("if: dragleave")
			list.classList.remove("dragover")
		}
		this.addEventListener("drop", this.dropHandler);

		shadow.appendChild(fileInput);

		this.feedback.innerHTML = "";
		shadow.appendChild(this.feedback);
	}

	handleAddFile(f) {
		const newFileItem = document.createElement("li");
		newFileItem.classList.add("file-item");
		const delBtn = document.createElement("button");
		delBtn.addEventListener("click", () => {
			try {
				fetch("http://127.0.0.1:8080/upload/" + f.name, {
					method: "DELETE"
				}).then(resp => {
					console.dir(resp);
					if (resp.ok) {
						newFileItem.parentNode.removeChild(newFileItem);
					}
				});
			} catch (error) {
				console.log("error sending delete request");
			}
		})
		delBtn.innerHTML = "x";

		const inputTitle = document.createElement("input");
		inputTitle.name = "filenames[]";
		inputTitle.placeholder = "Optional title";
		inputTitle.addEventListener("change", (e) => {
			console.log("Edited file title: ", e.target.value);
		})

		const progress = document.createElement("progress");
		progress.max = 100;
		progress.value = 50;

		let reader = new FileReader();
		const thumb = document.createElement("img");
		reader.onload = function(e) {
			thumb.src = e.target.result;
		}
		reader.readAsDataURL(f);
		newFileItem.innerHTML = f.name;
		newFileItem.appendChild(thumb);
		newFileItem.appendChild(delBtn);
		newFileItem.appendChild(document.createElement("br"));
		newFileItem.appendChild(inputTitle);
		newFileItem.appendChild(document.createElement("br"));
		newFileItem.appendChild(progress);
		this.list.appendChild(newFileItem);
		// TODO attach progress and status checking timer identified by
		// a upload id sent from server
		let data = new FormData();
		data.append("uploadFile", f);
		data.append("title", inputTitle.value);
		try {
			fetch("http://127.0.0.1:8080/upload", {
				method: "POST",
				body: data
			}).then(resp => resp.json()).then(
				res => console.dir(res)
			);
		} catch (error) {
			console.log("error:", error);
		}
	}

	dropHandler(event) {
		event.preventDefault();
		// source: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
		if (event.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			[...event.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (item.kind === "file") {
					const file = item.getAsFile();
					console.log(`… file[${i}].name = ${file.name}`, file);
					this.handleAddFile(file);
				}
			});
		} else {
			// Use DataTransfer interface to access the file(s)
			[...event.dataTransfer.files].forEach((file, i) => {
				console.log(`… file[${i}].name = ${file.name}`, file);
				this.handleAddFile(file);
			});
		}
	}
}


customElements.define("image-uploader", ImageUploader);
