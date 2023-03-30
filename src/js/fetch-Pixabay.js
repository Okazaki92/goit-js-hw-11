import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "34864371-45b05fc4683b315c0d551fd9e";
const fetchImages = async (query, page, perPage) => {
	const response = await axios.get(
		`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
	);
	return response;
};
export { fetchImages };
