// TODO optional style "destructive"

class ConfirmedButton extends HTMLButtonElement {
	msg = "Are you really sure?";

	constructor() {
		super();
		console.log("test222")

		this.addEventListener('click', () => {
			if (confirm(this.msg)) {
				console.log("Performing button action.");
			} else {
				console.log("Action cancelled.");
			}
		});
	}
}

customElements.define("confirmed-button", ConfirmedButton, { extends: "button" });
