import { useState, useRef, useEffect, Suspense } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  NavLink,
} from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "clsx";

import fetchFunctions from "../../service/tmdbApi";
import Loader from "../../components/Loader/Loader";

import styles from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.navLink, isActive && styles.active);
};

const MovieDetailsPage = () => {
  const [dataMovie, setDataMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const { movieId } = useParams();
  const backLinkRef = useRef(location.state || "/movies");

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchFunctions.fetchMovieDetailsByMovieId(movieId);
        setDataMovie(data);
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
      <section className={styles.section}>
        {" "}
        <Link to={backLinkRef.current} className={styles.link}>
          Go to back
        </Link>
        {isLoading && <Loader />}
        {dataMovie && (
          <>
            <img
              src={
                dataMovie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${dataMovie.backdrop_path}`
                  : "https://live.staticflickr.com/65535/51349451747_f6d7898f2c_n.jpg"
              }
              alt={dataMovie.title}
            />
            <h2>{dataMovie.title}</h2>
            <p>
              Genres: {dataMovie.genres.map(({ name }) => name).join(", ")}
            </p>{" "}
            <h3>Additional information</h3>
            <ul className={styles.list}>
              <li className={styles.item}>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>{" "}
              <li className={styles.item}>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>{" "}
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </>
        )}
        {!isLoading && !dataMovie && (
          <p>{"We don't have information for this movie"}</p>
        )}
      </section>
    </>
  );
};

export default MovieDetailsPage;
