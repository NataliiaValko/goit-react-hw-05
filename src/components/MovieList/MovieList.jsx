import { Link, useLocation } from "react-router-dom";

import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <ul className={styles.list}>
        {movies.map(({ title, id }) => (
          <li key={id} className={styles.item}>
            <Link to={`/movies/${id}`} state={location} className={styles.link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
