const SWIPE_DISTANCE = 50;

/**
 * Pages through the lightbox rendered by the ImageGallery component. Opening and closing are
 * native invoker commands, this only picks the image and handles the arrows, keys and swipes.
 */
class ImageGallery extends HTMLElement {
	/** @type {HTMLDialogElement} */
	dialog;

	/** @type {HTMLImageElement[]} */
	slides = [];

	/** @type {HTMLElement} */
	counter;

	/** @type {number} */
	current = 0;

	/** @type {number} */
	touchStart = 0;

	connectedCallback() {
		this.dialog = this.querySelector("dialog");
		this.slides = [...this.dialog.querySelectorAll("img")];
		this.counter = this.dialog.querySelector("[aria-live]");

		for (const button of this.querySelectorAll("[data-index]")) {
			button.addEventListener("click", () => this.show(Number(button.dataset.index)));
		}

		for (const button of this.dialog.querySelectorAll("[data-step]")) {
			button.addEventListener("click", () => this.step(Number(button.dataset.step)));
		}

		// The dialog spans the screen to centre the image, so the empty space around it acts as the backdrop.
		this.dialog.addEventListener("click", (event) => {
			if (!event.target.closest("img, button")) this.dialog.close();
		});

		this.dialog.addEventListener("keydown", (event) => {
			const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
			if (!step) return;

			event.preventDefault();
			this.step(step);
		});

		this.dialog.addEventListener(
			"touchstart",
			(event) => {
				this.touchStart = event.changedTouches[0].clientX;
			},
			{ passive: true },
		);

		this.dialog.addEventListener("touchend", (event) => {
			const distance = event.changedTouches[0].clientX - this.touchStart;
			if (Math.abs(distance) > SWIPE_DISTANCE) this.step(distance < 0 ? 1 : -1);
		});
	}

	/**
	 * Moves through the images, wrapping around at either end.
	 * @param {number} direction
	 */
	step(direction) {
		if (this.slides.length > 1) this.show(this.wrap(this.current + direction));
	}

	/**
	 * @param {number} index
	 * @returns {number} The index brought back within the slides.
	 */
	wrap(index) {
		const total = this.slides.length;
		return (index + total) % total;
	}

	/**
	 * @param {number} index
	 */
	show(index) {
		this.current = index;
		this.slides.forEach((slide, i) => (slide.hidden = i !== index));
		this.counter.textContent = `${index + 1} / ${this.slides.length}`;

		// Hidden lazy images never load, so the neighbours are fetched ahead of a swipe.
		for (const neighbour of [index - 1, index + 1]) {
			this.slides[this.wrap(neighbour)].loading = "eager";
		}
	}
}

if (!customElements.get("image-gallery")) {
	customElements.define("image-gallery", ImageGallery);
}
