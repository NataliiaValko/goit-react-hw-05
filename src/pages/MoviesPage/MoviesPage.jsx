import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import fetchFunctions from "../../service/tmdbApi";

import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { results } = await fetchFunctions.fetchMovieByQuery(query);
        setMovies(results);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = (query) => {
    setSearchParams({ query });
  };

  return (
    <section className={styles.section}>
      <SearchForm onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
    </section>
  );
};

export default MoviesPage;
