import "./sass/index.scss";
import Notiflix from "notiflix";
import { fetchImages } from "./js/fetch-Pixabay";
import { renderGallery } from "./js/render-gallery";

const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".btn-load-more");

let query = "";
let page = 1;
const perPage = 40;

function alertImagesFound(data) {
	Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

const onSubmit = (event) => {
	event.preventDefault;
	page = 1;
	query = event.currentTarget.searchQuery.value.trim();
	gallery.innerHTML = "";
	loadMoreBtn.classList.add("is-hidden");
	fetchImages(query, page, perPage)
		.then(({ data }) => {
			if (data.totalHits === 0) {
				Notiflix.Notify.failure(
					"Sorry, there are no images matching your search query. Please try again.",
				);
			} else {
				renderGallery(data.hits);
				alertImagesFound(data);

				if (data.totalHits > perPage) {
					loadMoreBtn.classList.remove("is-hidden");
				}
			}
		})
		.catch((error) => console.log(error))
		.finally(() => {
			searchForm.reset();
		});
};
searchForm.addEventListener("submit", onSubmit);
