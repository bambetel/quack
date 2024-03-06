class ImageUploader extends HTMLElement {
	feedback = document.createElement("p");

	constructor() {
		super();
	}

	connectedCallback() {
		// TODO WHY this doesn't remove component children?
		// while (this.firstChild) {
		// 	this.removeChild(this.lastChild);
		// }
		const shadow = this.attachShadow({ mode: "open" });
		const list = document.createElement("ol");
		const label = document.createElement("label");
		const fileInput = document.createElement("input");
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`
			img {
				max-width:  100px;
				max-height: 100px;
			}
			`);
		shadow.adoptedStyleSheets = [sheet];
		fileInput.setAttribute("type", "file");
		fileInput.setAttribute("multiple", "");

		label.innerText = "Uploaded files:";
		shadow.appendChild(label);
		shadow.appendChild(list);

		fileInput.addEventListener("change", (e) => {
			console.log("File count:", e.target.files.length);
			for (let i = 0; i < e.target.files.length; i++) {
				let f = e.target.files[i];
				console.dir("File:", f);
				const newFileItem = document.createElement("li");
				const delBtn = document.createElement("button");
				delBtn.addEventListener("click", () => {
					// TODO server request
					newFileItem.parentNode.removeChild(newFileItem);
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
				list.appendChild(newFileItem);
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
			e.target.value = null;
		})

		shadow.appendChild(fileInput);

		this.feedback.innerHTML = "";
		shadow.appendChild(this.feedback);
	}
}

customElements.define("image-uploader", ImageUploader);
