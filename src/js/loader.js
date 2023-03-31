const loaderDOM = document.querySelector(".loader");

const hideLoader = () => {
	loaderDOM.classList.remove("show");
};

const showLoader = () => {
	loaderDOM.classList.add("show");
};

const loader = { hideLoader, showLoader };
export default loader;
