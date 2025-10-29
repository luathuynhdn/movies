import { useState } from "react";

import type { MovieModel } from "@models/movie.model";
import { IMAGE_BASE_URL } from "@constants/common.constant";
import LazyImage from "@components/LazyImage/LazyImage";

interface Props {
  movie: MovieModel;
  onClick?: (movie: MovieModel) => void;
  viewType?: "gridView" | "listView";
}

const MovieCard: React.FC<Props> = ({
  movie,
  onClick,
  viewType = "gridView",
}) => {
  const [imgSrc, setImgSrc] = useState(`${IMAGE_BASE_URL}${movie.poster_path}`);

  return (
    <div className={`movie-card ${viewType}`} onClick={() => onClick?.(movie)}>
      <LazyImage
        src={imgSrc}
        alt={movie.title}
        onMouseEnter={() =>
          setImgSrc(`${IMAGE_BASE_URL}${movie.backdrop_path}`)
        }
        onMouseLeave={() => setImgSrc(`${IMAGE_BASE_URL}${movie.poster_path}`)}
        className="poster-img"
      />
      <div className="info">
        <div className="title" title={movie.title}>
          <span className="rating">⭐{movie.vote_average.toFixed(1)}</span>
          &nbsp;
          {movie.title}
        </div>
        <div className="date">{movie.release_date}</div>
        <div className="discription">{movie.overview}</div>
      </div>
    </div>
  );
};

export default MovieCard;
