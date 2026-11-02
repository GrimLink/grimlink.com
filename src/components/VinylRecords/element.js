const VIEW_STORAGE_KEY = "vinyl-view";

/**
 * @param {HTMLElement} a
 * @param {HTMLElement} b
 * @returns {number} The sort order of both records by title.
 */
const byTitle = (a, b) => a.dataset.title.localeCompare(b.dataset.title);

/** @type {Record<string, (a: HTMLElement, b: HTMLElement) => number>} */
const SORTERS = {
	title: byTitle,
	artist: (a, b) => a.dataset.artist.localeCompare(b.dataset.artist) || byTitle(a, b),
	"year-desc": (a, b) => Number(b.dataset.year) - Number(a.dataset.year) || byTitle(a, b),
	"year-asc": (a, b) => Number(a.dataset.year) - Number(b.dataset.year) || byTitle(a, b),
};

/**
 * Sorts and filters the server rendered record list, using the form inside the element.
 * The form also switches the view, which is styled in CSS from the data-view attribute.
 * Clicking a cover pages through its images in a single shared lightbox.
 */
class VinylRecords extends HTMLElement {
	/** @type {HTMLFormElement} */
	form;

	/** @type {HTMLElement} */
	list;

	/** @type {HTMLElement} */
	counter;

	/** @type {HTMLElement[]} */
	records = [];

	/** @type {HTMLDialogElement} */
	dialog;

	/** @type {HTMLImageElement} */
	galleryImage;

	/** @type {HTMLElement} */
	galleryCaption;

	/** @type {HTMLButtonElement[]} */
	galleryThumbs = [];

	/** @type {{ src: string, thumb: string, label: string }[]} */
	gallery = [];

	/** @type {string} */
	galleryTitle = "";

	/** @type {number} */
	galleryIndex = 0;

	connectedCallback() {
		this.form = this.querySelector("form");
		this.list = this.querySelector("ul");
		this.counter = this.querySelector("[aria-live]");
		this.records = [...this.list.children];
		this.dialog = this.querySelector("dialog");
		this.galleryImage = this.dialog.querySelector("img");
		this.galleryCaption = this.dialog.querySelector("p");
		this.galleryThumbs = [...this.dialog.querySelectorAll("[data-thumb]")];

		const viewSelect = this.form.elements.namedItem("view");

		this.form.addEventListener("change", () => this.update());
		viewSelect.addEventListener("change", () => {
			localStorage.setItem(VIEW_STORAGE_KEY, viewSelect.value);
		});

		for (const button of this.querySelectorAll("[data-step]")) {
			button.addEventListener("click", () => this.step(Number(button.dataset.step)));
		}

		this.list.addEventListener("click", (event) => {
			if (event.target.closest("a")) return;

			const record = this.records.find((item) => item.contains(event.target));
			if (!record) return;

			if (this.dataset.view === "drawer" && !this.isCentered(record)) {
				this.center(record);
				return;
			}

			const cover = event.target.closest("[data-gallery]");
			if (cover) this.openGallery(record, cover);
		});

		for (const thumb of this.galleryThumbs) {
			thumb.addEventListener("click", () => this.showImage(Number(thumb.dataset.thumb)));
		}

		// The dialog spans the screen, so the empty space around the image acts as the backdrop.
		this.dialog.addEventListener("click", (event) => {
			if (!event.target.closest("img, button")) this.dialog.close();
		});

		this.dialog.addEventListener("keydown", (event) => {
			const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
			if (!step) return;

			event.preventDefault();
			const total = this.gallery.length;
			this.showImage((this.galleryIndex + step + total) % total);
		});

		const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
		if ([...viewSelect.options].some((option) => option.value === savedView)) {
			viewSelect.value = savedView;
		}

		// Browsers can restore the selects on reload, so the list has to catch up.
		this.update();
	}

	/**
	 * Applies the current form values to the list and announces the result.
	 */
	update() {
		const { sort, genre, view } = Object.fromEntries(new FormData(this.form));
		this.dataset.view = view;

		const visible = this.records.filter((record) => {
			const matches = !genre || record.dataset.genres.split("|").includes(genre);
			record.hidden = !matches;
			return matches;
		});

		this.list.append(...this.records.toSorted(SORTERS[sort]));
		this.list.scrollTo({ left: 0 });

		const total = this.records.length;
		const shown = visible.length === total ? total : `${visible.length} of ${total}`;
		this.counter.textContent = `${shown} ${total === 1 ? "record" : "records"}`;
	}

	/**
	 * Moves the drawer to the neighbouring record, stopping at either end.
	 * @param {number} direction
	 */
	step(direction) {
		const visible = [...this.list.children].filter((record) => !record.hidden);
		const middle = this.list.scrollLeft + this.list.clientWidth / 2;
		const distances = visible.map((record) => Math.abs(this.middleOf(record) - middle));
		const current = distances.indexOf(Math.min(...distances));
		const target = visible[current + direction];

		if (target) this.center(target);
	}

	/**
	 * @param {HTMLElement} record
	 * @returns {boolean} Whether the drawer has this record as its active one.
	 */
	isCentered(record) {
		const middle = this.list.scrollLeft + this.list.clientWidth / 2;
		return Math.abs(this.middleOf(record) - middle) < 4;
	}

	/**
	 * @param {HTMLElement} record
	 * @param {HTMLElement} cover
	 */
	openGallery(record, cover) {
		this.gallery = JSON.parse(cover.dataset.gallery);
		this.galleryTitle = record.dataset.title;

		this.galleryThumbs.forEach((thumb, index) => {
			const image = this.gallery[index];
			thumb.hidden = !image || this.gallery.length === 1;
			if (!image) return;

			thumb.setAttribute("aria-label", image.label);
			thumb.querySelector("img").src = image.thumb;
		});

		this.showImage(0);
		this.dialog.showModal();
	}

	/**
	 * @param {number} index
	 */
	showImage(index) {
		const { src, label } = this.gallery[index];
		this.galleryIndex = index;
		this.galleryImage.src = src;
		this.galleryImage.alt = `${label} of ${this.galleryTitle}`;
		this.galleryCaption.textContent = `${this.galleryTitle}, ${label.toLowerCase()}`;

		this.galleryThumbs.forEach((thumb, thumbIndex) => {
			thumb.setAttribute("aria-current", String(thumbIndex === index));
		});
	}

	/**
	 * @param {HTMLElement} record
	 * @returns {number} The middle of the record, in the coordinates of the list.
	 */
	middleOf(record) {
		return record.offsetLeft + record.offsetWidth / 2;
	}

	/**
	 * Scrolls the list itself, as scrollIntoView would also move the page.
	 * @param {HTMLElement} record
	 */
	center(record) {
		const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

		this.list.scrollTo({
			left: this.middleOf(record) - this.list.clientWidth / 2,
			behavior: reduceMotion ? "auto" : "smooth",
		});
	}
}

if (!customElements.get("vinyl-records")) {
	customElements.define("vinyl-records", VinylRecords);
}
