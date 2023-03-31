import axios from "axios";

const getGallery = async (query, page, perPage) => {
	try {
		const response = await axios.get("https://pixabay.com/api/", {
			params: {
				key: "34523545-f21683fd59bfc3e4e2549fe07",
				q: `${query}`,
				image_type: "photo",
				orientation: "horizontal",
				safesearch: true,
				page: `${page}`,
				per_page: `${perPage}`,
			},
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

const showGallery = { getGallery };
export default showGallery;
