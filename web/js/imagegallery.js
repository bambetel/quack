class ImageGallery extends HTMLDivElement {

	constructor() {
		super();
	}

	connectedCallback() {
		console.log("hello gallery")

		let intersectionObserver = new IntersectionObserver((entries) => {
			// If intersectionRatio is 0, the target is out of view
			// and we do not need to do anything.
			// if (entries[0].intersectionRatio <= 0) return;
			for (let e of entries) {
				console.log("intersection: ", e.intersectionRatio);

				if (e.intersectionRatio > 0) {
					console.log("show:", e.target)
					const img = e.target.querySelector("img")

					// delay for demonstration
					setTimeout(() => {
						if (img.hasAttribute("data-ready")) {
							img.src = img.getAttribute("data-src");
							img.removeAttribute("data-ready")
						}
						img.style.border = "2px solid red";
					}, 2000);
				}
			}

			console.dir(entries)


			console.log("Loaded new items");
		});
		// start observing
		setTimeout(() => {
			for (let elem of [...document.querySelectorAll(".imagethumb")]) {
				intersectionObserver.observe(elem);
			}
		}, 200);
	}
}

customElements.define("image-gallery", ImageGallery, { extends: "div" })
