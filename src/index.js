import "./sass/index.scss";
import Notiflix from "notiflix";
import showGallery from "./js/showGallery";
import addGallery from "./js/addGallery";

const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
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
	Notiflix.Notify.warning(
		"We're sorry, but you've reached the end of search results.",
	);
};

const onSubmit = (event) => {
	event.preventDefault();
	page = 1;
	query = event.currentTarget.searchQuery.value.trim();
	gallery.innerHTML = "";
	loadMoreBtn.classList.add("is-hidden");
	showGallery.getGallery();
	console.log(showGallery.getGallery());
};
searchForm.addEventListener("submit", onSubmit);
