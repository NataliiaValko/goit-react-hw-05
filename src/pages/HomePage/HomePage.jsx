import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import fetchFunctions from "../../service/tmdbApi";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { results } = await fetchFunctions.fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.section}>
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
    </section>
  );
};

export default HomePage;
