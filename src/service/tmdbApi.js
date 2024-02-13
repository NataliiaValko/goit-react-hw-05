import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWQyZjA4ZDRlMDFmNjNlNDA0MjMwMzRhYmFhZDYzOSIsInN1YiI6IjY0MjNmMmU4NjkwNWZiMDA3N2VmYjE4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B1yTjebLF7cIuJcxcmeRj9NgGgh_7fZlQAA8C7F6xjQ";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

const fetchTrendingMovies = async () => {
  const { data } = await axios(`${BASE_URL}/trending/movie/day`, options);
  return data;
};

const fetchMovieByQuery = async (query) => {
  const { data } = await axios(
    `${BASE_URL}/search/movie?query=${query}`,
    options
  );
  return data;
};

const fetchMovieDetailsByMovieId = async (movieId) => {
  const { data } = await axios(`${BASE_URL}/movie/${movieId}`, options);
  return data;
};

const fetchCreditsByMovieId = async (movieId) => {
  const { data } = await axios(`${BASE_URL}/movie/${movieId}/credits`, options);
  return data;
};

const fetchReviewsByMovieId = async (movieId) => {
  const { data } = await axios(`${BASE_URL}/movie/${movieId}/reviews`, options);
  return data;
};

const data = {
  fetchTrendingMovies,
  fetchMovieByQuery,
  fetchMovieDetailsByMovieId,
  fetchCreditsByMovieId,
  fetchReviewsByMovieId,
};

export default data;
