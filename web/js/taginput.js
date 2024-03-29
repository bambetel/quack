class TagInput extends HTMLElement {
	tags = Array("test", "tag", "third");
	tagList = document.createElement("div");
	feedback = document.createElement("p");

	constructor() {
		super();
	}
	tagsUpdate = () => this.setAttribute("value", this.tags.join(","));

	connectedCallback() {
		// TODO WHY this doesn't remove component children?
		// while (this.firstChild) {
		// 	this.removeChild(this.lastChild);
		// }
		const shadow = this.attachShadow({ mode: "open" });
		const label = document.createElement("label");
		const input = document.createElement("input");

		shadow.append(templatetaginput.content.cloneNode(true))
		label.innerText = "Item Tags:";
		shadow.appendChild(label);
		shadow.appendChild(this.tagList);

		this.tags.forEach((elem) => {
			let span = this.createTagNode(elem);
			this.tagList.appendChild(span);
		});

		let resetInput = () => {
			input.value = "";
			this.tagsUpdate();
			this.feedback.innerHTML = "";
		}
		resetInput();

		input.addEventListener("keypress", (e) => {
			// TODO all realatable events
			if (e.key == "Enter") {
				let msg = "";
				if (this.tags.includes(input.value)) {
					this.feedback.innerHTML = "Duplicate tag. ";
					return;
				}
				if (input.value.length < 3) {
					msg += "Tag should be at least 3 characters long. ";
				}
				if (input.value.length > 30) {
					msg += "Tag should be at most 30 characters long. ";
				}
				if (!/^\w+$/.test(input.value)) {
					// TODO might accept comma separated list of tags
					msg += "Tag should consist only of letters, numbers and _. ";
				}
				if (msg != "") {
					this.feedback.innerHTML = msg;
					return;
				}
				this.tags.push(input.value);
				this.tagList.appendChild(this.createTagNode(input.value));
				resetInput()
			} else {
				this.feedback.innerHTML = "";
			}
		});
		shadow.appendChild(input);

		this.feedback.innerHTML = "";
		shadow.appendChild(this.feedback);
	}

	createTagNode(tag) {
		let span = document.createElement("span");
		let btn = document.createElement("button");
		btn.innerHTML = "x";
		btn.className = "tag";
		btn.addEventListener("click", (e) => {
			this.tags = this.tags.filter((a) => a != tag);
			span.parentNode.removeChild(span);
			this.tagsUpdate();
		});
		span.innerText = tag;
		span.appendChild(btn);
		span.className = "tag";
		return span;
	}
}

customElements.define("tag-input", TagInput);
