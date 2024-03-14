class ValidatedInput extends HTMLInputElement {
	static observedAttributes = ["value"];
	maxLength = 12;
	minLength = 5;

	constructor() {
		super();
	}

	connectedCallback() {
		const feedbackId = this.id + "-feedback";
		console.log("id:", feedbackId)
		// NOT AVAILABLE HERE
		// let feedback = document.getElementById(feedbackId);

		this.feedback = document.getElementById(feedbackId);

		this.minLength = parseInt(this.getAttribute('data-minlen'))
		this.maxLength = parseInt(this.getAttribute('data-maxlen'))

		this.addEventListener("change", (e) => {
			console.log("You entered:", this.value);
			this.validate();
			e.preventDefault();
		});

		this.addEventListener("keypress", (e) => {
			this.validate();
			console.log(`You pressed: ${this.value} &lt;- ${e.key}`);
		});


	}

	validate() {
		const feedbackId = this.id + "-feedback";
		this.feedback = document.getElementById(feedbackId);
		let valid = this.value.length >= this.minLength && this.value.length <= this.maxLength;
		this.setAttribute("aria-invalid", valid ? "false" : "true")
		if (!valid) {
			this.feedback.innerHTML = `Invalid length, expects ${this.minLength}-${this.maxLength} characters`;
		} else {
			this.feedback.innerHTML = "OK";
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} change: ${oldValue} -> ${newValue}`);
	}
}

customElements.define("validated-input", ValidatedInput, { extends: "input" })
