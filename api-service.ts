import axios from "axios";

const API_KEY = "fbd18fed44b652e00c4c4687fa9d95ff";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getUpcomingMovies = async (page = 1) => {
  const response = await api.get("/movie/upcoming", {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieImages = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/images`);
  return response.data;
};

export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const getGenres = async () => {
  const response = await api.get("/genre/movie/list");
  return response.data.genres;
};

export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
    );
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};
