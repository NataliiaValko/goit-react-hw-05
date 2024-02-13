import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import fetchFunctions from "../../service/tmdbApi";
import Loader from "../../components/Loader/Loader";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { results } = await fetchFunctions.fetchReviewsByMovieId(movieId);
        if (results.length > 0) setReviews(results);
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
      {reviews?.length > 0 && (
        <ul>
          {reviews.map(({ content, author, id }) => (
            <li key={id}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !reviews && (
        <p>{"We don't have information for this movie"}</p>
      )}
    </>
  );
};

export default MovieReviews;
