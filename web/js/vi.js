class ValidatedInput extends HTMLInputElement {
	static observedAttributes = ["value"];


	constructor() {
		super();
	}

	connectedCallback() {
		const feedbackId = this.id + "-feedback";
		console.log("id:", feedbackId)
		// NOT AVAILABLE HERE
		// let feedback = document.getElementById(feedbackId);

		this.addEventListener("change", (e) => {
			let feedback = document.getElementById(feedbackId);
			console.log("You entered:", this.value);
			feedback.innerHTML = `You entered: ${this.value}`;
			e.preventDefault();
		});

		this.addEventListener("keypress", (e) => {
			console.log(`You pressed: ${this.value} &lt;- ${e.key}`);
		});

	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} change: ${oldValue} -> ${newValue}`);
	}
}

customElements.define("validated-input", ValidatedInput, { extends: "input" })
