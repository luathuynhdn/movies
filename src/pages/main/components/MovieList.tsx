import { useState } from "react";
import "../styles/movie-list.scss";

import MovieCard from "./MovieCard";
import type { MovieModel } from "@models/movie.model";
import Modal from "@components/Modal/Modal";
import MovieDetails from "./MovieDetails";

interface MovieListProps {
  movies: MovieModel[];
  lastMovieRef: (node: HTMLDivElement | null) => void;
  loading?: boolean;
  error?: string | null;
  viewType?: "gridView" | "listView";
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  lastMovieRef,
  loading,
  error,
  viewType,
}) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>();

  const onClickMovie = (movie: MovieModel) => {
    setOpenDetailModal(true);
    setSelectedMovie(movie);
  };

  return (
    <>
      <div className={`movie-list ${viewType}`}>
        {movies.map((movie, index) =>
          index === movies.length - 1 ? (
            <div ref={lastMovieRef} key={movie.id}>
              <MovieCard
                movie={movie}
                viewType={viewType}
                onClick={onClickMovie}
              />
            </div>
          ) : (
            <MovieCard
              key={movie.id}
              viewType={viewType}
              movie={movie}
              onClick={onClickMovie}
            />
          )
        )}

        {loading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`movie-skeleton ${viewType}`}>
              <div className="poster-skeleton" />
              <div className="info-skeleton">
                <div className="line" style={{ width: "80%" }} />
                <div className="line" style={{ width: "60%" }} />
              </div>
            </div>
          ))}
      </div>
      {error && <p className="movie-list__error">{error}</p>}

      <Modal
        isOpen={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        title="Movie Details"
      >
        <MovieDetails movieId={selectedMovie?.id} />
      </Modal>
    </>
  );
};

export default MovieList;
