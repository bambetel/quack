class ValidatedInput extends HTMLElement {
	static observedAttributes = ["value"];
	label = "Name";
	value = "Jan";
	placeholder = "Paweł";
	name = "name";
	id = "input-name";

	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'closed' });

		shadow.innerHTML = `
		<div>
			<label for=${this.id}>${this.label}</label>
			<input type="text" name="${this.name}" id="${this.id}" value="${this.value}" placeholder="${this.placeholder}">
			<p><span class="input-feedback">Validation feedback</span></p>
		</div>
		`;

		let input = shadow.querySelector("input#input-name");
		let feedback = shadow.querySelector(".input-feedback");

		input.addEventListener("change", (e) => {
			console.log("You entered:", input.value);
			feedback.innerHTML = `You entered: ${input.value}`;
			this.value = input.value;
			this.setAttribute("value", this.value)
			e.preventDefault();
		});

		input.addEventListener("keypress", (e) => {
			feedback.innerHTML = `You pressed: ${input.value} &lt;- ${e.key}`;
		});

	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} change: ${oldValue} -> ${newValue}`);
	}
}

customElements.define("validated-input", ValidatedInput)
