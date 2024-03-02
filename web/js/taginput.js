class TagInput extends HTMLElement {
	tags = Array("test", "tag", "third");
	tagList = document.createElement("div");

	constructor() {
		super();

		let shadow = this.attachShadow({ mode: "open" });

		const label = document.createElement("label");
		label.innerText = "Item Tags:";
		shadow.appendChild(label);
		shadow.appendChild(this.tagList);

		this.tags.forEach((elem) => {
			let span = this.createTagNode(elem);
			this.tagList.appendChild(span);
		});
		let input = document.createElement("input");

		input.addEventListener("keypress", (e) => {
			// TODO all realatable events
			if (e.key == "Enter") {
				if (input.value.length < 3) {
					return;
				}
				this.tags.push(input.value);
				this.tagList.appendChild(this.createTagNode(input.value));
				input.value = "";
			}
		});
		shadow.appendChild(input);
	}

	createTagNode(tag) {
		let span = document.createElement("span");
		let btn = document.createElement("button");
		btn.innerHTML = "x";
		btn.className = "tag";
		btn.addEventListener("click", (e) => {
			this.tags = this.tags.filter((a) => a != tag);
			span.parentNode.removeChild(span);
		});
		span.innerText = tag;
		span.appendChild(btn);
		span.className = "tag";
		return span;
	}
}

customElements.define("tag-input", TagInput);
