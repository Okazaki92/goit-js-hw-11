import "./sass/index.scss";
import Notiflix from "notiflix";
import showGallery from "./js/showGallery";
import addGallery from "./js/addGallery";

const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
let query = "";
let page = 1;
const perPage = 40;
const loadMoreBtn = document.querySelector(".btn-load-more");
const alertNoImagesFound = () => {
	Notiflix.Notify.failure(
		"Sorry, there are no images matching your search query. Please try again.",
	);
};

const successImagesFound = (data) => {
	Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
};

const informNoMoreImages = () => {
	Notiflix.Notify.failure(
		"We're sorry, but you've reached the end of search results.",
	);
};

const onSubmit = async (event) => {
	event.preventDefault();
	page = 1;
	query = event.currentTarget.searchQuery.value.trim();
	gallery.innerHTML = "";
	loadMoreBtn.classList.add("is-hidden");
	try {
		const data = await showGallery.getGallery(query, page, perPage);
		data.totalHits === 0 ? alertNoImagesFound() : successImagesFound(data);
		addGallery.renderGallery(data.hits);
		data.totalHits > perPage
			? loadMoreBtn.classList.remove("is-hidden")
			: loadMoreBtn.classList.add("is-hidden");
	} catch (error) {
		console.log(error);
	}
};
searchForm.addEventListener("submit", onSubmit);

const loadMore = async (event) => {
	event.preventDefault();
	page += 1;
	try {
		const data = await showGallery.getGallery(query, page, perPage);
		console.log(data);

		addGallery.renderGallery(data.hits);

		const totalPages = data.totalHits / perPage;
		console.log(totalPages);
		console.log(page);

		if (page > totalPages) {
			informNoMoreImages();
			loadMoreBtn.classList.add("is-hidden");
		}
	} catch (error) {
		console.log(error);
	}
};
loadMoreBtn.addEventListener("click", loadMore);
