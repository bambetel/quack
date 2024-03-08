class GoChecklist extends HTMLElement {
	numMin = NaN;
	numMax = NaN;

	constructor() {
		super();
		this.onMutation = this.onMutation.bind(this);
	}

	connectedCallback() {
		console.log("hello checklist")
		this.observer = new MutationObserver(this.onMutation);

		this.observer.observe(this, {
			childList: true
		});

		// TODO: just for checkboxes
		// when are they accessible?
		this.addEventListener("click", this.countChecked)

		let parseRangeParam = (str) => {
			let n = parseInt(str);
			return n < 0 ? NaN : n;
		}
		// TODO: check numMin <= numMax
		this.numMin = parseRangeParam(this.getAttribute("data-nummin"));
		this.numMax = parseRangeParam(this.getAttribute("data-nummax"));
		console.log(`sel n range ${this.numMin}:${this.numMax}`);
	}

	onMutation(mutations) {
		const added = [];

		for (const mutation of mutations) {
			added.push(...mutation.addedNodes);
		}
		// for (let a of added) {
		// 	if (a.nodeType == Node.ELEMENT_NODE) {
		// 		console.log("found element", a.tagName)
		// 		a.querySelectorAll("input").forEach(i => {
		// 			console.dir("input found");
		// 			i.addEventListener("click", (e) => this.countChecked);
		// 		});
		// 	}
		// }
		console.log("mutated")

		this.countChecked();
	}

	countChecked() {
		const sum = this.querySelectorAll(`input[type="checkbox"]:checked`).length;

		let msg = "ok";
		let valid = false;
		if (sum < this.numMin && this.numMin != NaN) {
			msg = `Too little checked items`;
		} else if (sum > this.numMax && this.numMax != NaN) {
			msg = `Too much checked items`;
		} else {
			valid = "true";
		}
		this.setAttribute("data-valid", valid);
		this.querySelector(".q-feedback").innerHTML = msg;
	}


}

customElements.define("go-checklist", GoChecklist, { extends: "section" });
