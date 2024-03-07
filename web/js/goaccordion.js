class GoAccordion extends HTMLElement {
	constructor() {
		super();
		this.onMutation = this.onMutation.bind(this);
	}

	connectedCallback() {
		this.observer = new MutationObserver(this.onMutation);

		this.observer.observe(this, {
			childList: true
		});
	}

	onMutation(mutations) {
		const added = [];

		for (const mutation of mutations) {
			added.push(...mutation.addedNodes);
		}

		added.forEach((a) => {
			a.addEventListener("click", (e) => {
				console.log("klik!");
				this.toggleAll(e.target);
			});
		});
	}

	toggleAll(item) {
		const items = this.querySelectorAll("details");
		items.forEach((i) => {
			if (i != item) {
				i.removeAttribute("open");
			}
		});
	}
}

customElements.define("go-accordion", GoAccordion, { extends: "section" });
