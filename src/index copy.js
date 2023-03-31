import "./sass/index.scss";
import Notiflix from "notiflix";
import { fetchImages } from "./js/showGallery";
import { renderGallery } from "./js/addGallery";

const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".btn-load-more");

let query = "";
let page = 1;
const perPage = 40;

function alertImagesFound(data) {
	Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}
function alertNoImagesFound() {
	Notiflix.Notify.failure(
		"Sorry, there are no images matching your search query. Please try again.",
	);
}

const onSubmit = (event) => {
	event.preventDefault();
	page = 1;
	query = event.currentTarget.searchQuery.value.trim();
	gallery.innerHTML = "";
	loadMoreBtn.classList.add("is-hidden");
	fetchImages(query, page, perPage)
		.then(({ data }) => {
			if (data.totalHits === 0) {
				alertNoImagesFound();
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
