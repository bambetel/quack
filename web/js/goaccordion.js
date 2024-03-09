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
			// click event on details (not summary) not to complicate mutation callbacks
			a.addEventListener("click", (e) => {
				this.toggleOther(e);
			});
		});
	}

	toggleOther(e) {
		if (!e.target.closest("summary") || e.currentTarget.tagName != "DETAILS") {
			return
		}
		const items = this.querySelectorAll(":scope > details");
		items.forEach((i) => {
			if (i != e.currentTarget) {
				i.removeAttribute("open")
			}
		});
	}
}

customElements.define("go-accordion", GoAccordion, { extends: "section" });
