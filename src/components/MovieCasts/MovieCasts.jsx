import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import fetchFunctions from "../../service/tmdbApi";
import Loader from "../../components/Loader/Loader";

import styles from "./MovieCasts.module.css";

const MovieCasts = () => {
  const [casts, setCasts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { cast } = await fetchFunctions.fetchCreditsByMovieId(movieId);
        setCasts(cast);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}

      {Array.isArray(casts) && (
        <ul className={styles.list}>
          {casts.map(({ name, profile_path, id }) => (
            <li key={id}>
              <img
                className={styles.image}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : "https://live.staticflickr.com/65535/51349451747_f6d7898f2c_n.jpg"
                }
                alt={name}
              />
              <h4>{name}</h4>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !casts && (
        <p>{"We don't have information for this movie"}</p>
      )}
    </>
  );
};

export default MovieCasts;
