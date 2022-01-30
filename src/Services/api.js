import axios from "axios";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "25315376-9146c2ed2421f32b20fc9f298";

const fetchImages = (searchImages, page) => {
  return axios.get(`${BASE_URL}/?q=${searchImages}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
};
export default fetchImages;
