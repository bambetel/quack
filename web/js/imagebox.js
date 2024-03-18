class ImageBox extends HTMLDivElement {
	/* TODO:
			* styles
			* modal
			* frame
			* pointers
			* buttons
			*/
	constructor() {
		super();
	}

	connectedCallback() {
		console.log("hello gallery");
		this.curr = -1;
		this.count = 0;
		this.urls = [];

		const box = document.createElement("dialog");
		this.boxImg = document.createElement("img");
		const btnClose = document.createElement("button");
		const btnNext = document.createElement("button");
		const btnPrev = document.createElement("button");
		btnClose.innerHTML = "close";
		btnClose.addEventListener("click", (ev) => {
			box.close("dialogclosed");
		});
		btnNext.innerHTML = "next";
		btnPrev.innerHTML = "prev";
		btnNext.addEventListener("click", (ev) => this.nextImage(ev, 1));
		btnPrev.addEventListener("click", (ev) => this.nextImage(ev, -1));
		box.appendChild(this.boxImg);
		box.appendChild(btnClose);
		box.appendChild(btnNext);
		box.appendChild(btnPrev);
		this.appendChild(box);

		setTimeout(() => {
			let i = 0;
			for (let elem of [...document.querySelectorAll(".imagethumb")]) {
				const url = elem.querySelector("img").getAttribute("data-src");
				elem.setAttribute("data-nth", i);
				elem.addEventListener("click", (ev) => {
					let i = parseInt(ev.currentTarget.getAttribute("data-nth"));
					this.curr = i;
					console.log(i);
					this.boxImg.src = url;
					box.showModal();
				});
				this.urls.push(url);
				i++;
			}
			this.count = i;
		}, 1000);
	}

	nextImage(ev, dir) {
		const old = this.curr;
		this.curr = (this.curr + dir) % this.count;
		console.log(`${old} -> ${this.curr}`);
		this.boxImg.src = this.urls[this.curr];
	}
}

customElements.define("image-box", ImageBox, { extends: "div" })
