/* Key -> Value input
	* All items are optional
	* Example uses
		- input list of Markdown references
		- document metadata 
	* TODO:
		* some fixed keys
		* some obligatory keys (predefined, cannot remove)
*/
class GoKeyVal extends HTMLElement {
	counter = 1;

	constructor() {
		super();
	}

	connectedCallback() {
		const btnAdd = document.createElement("button");
		btnAdd.innerText = "Add row";
		const kv = this;
		btnAdd.addEventListener("click", (e) => {
			let newContent = document.getElementById("templatekvitem").content.cloneNode(true);
			let newNode = document.importNode(newContent, true);
			newNode.querySelector("button").addEventListener("click", (e) => {
				const row = e.target.closest(".keyval-row");
				row.parentElement.removeChild(row);
			});
			newNode.querySelector("input").value = "Item " + (this.counter++);
			this.appendChild(newNode);
			console.log(newContent);
		});
		this.appendChild(btnAdd);

	}
}

customElements.define("go-keyval", GoKeyVal, { extends: "section" });
