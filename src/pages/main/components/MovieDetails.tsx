import { useEffect, useState } from "react";

import "../styles/movie-details.scss";

import LazyImage from "@components/LazyImage/LazyImage";
import { IMAGE_BASE_URL } from "@constants/common.constant";
import type { MovieDetailsModel } from "@models/movie.model";
import { getMovieDetails } from "@repositories/movie.repository";
import Skeleton from "@components/Skeleton/Skeleton";

interface MovieDetailsProps {
  movieId?: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<MovieDetailsModel>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (!movieId) return;
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Failed to load movie details", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [movieId]);

  return (
    <div className="movie-details">
      <div className="poster-section">
        <LazyImage
          src={`${IMAGE_BASE_URL}${movie?.poster_path || ""}`}
          alt={movie?.title}
          className="poster-img"
          apiLoading={loading}
        />
      </div>

      <div className="info-section">
        <div className="description">
          <Skeleton loading={loading} height={30}>
            <h2 className="movie-title">{movie?.title}</h2>
          </Skeleton>
          <Skeleton loading={loading} height={20}>
            {movie?.tagline && <p className="tagline">"{movie?.tagline}"</p>}
          </Skeleton>
          <Skeleton loading={loading} height={200}>
            <p className="overview">{movie?.overview}</p>
          </Skeleton>
          <Skeleton loading={loading} height={40}>
            <div className="rating">
              ⭐ {movie?.vote_average?.toFixed(1)} / 10 ({movie?.vote_count}{" "}
              votes)
            </div>
          </Skeleton>
        </div>

        <div className="description">
          <Skeleton loading={loading} height={"100%"}>
            <div className="metadata">
              <p>
                <strong>Release Date:</strong> {movie?.release_date}
              </p>
              <p>
                <strong>Runtime:</strong> {movie?.runtime} min
              </p>
              <p>
                <strong>Status:</strong> {movie?.status}
              </p>
              <p>
                <strong>Budget:</strong> ${movie?.budget?.toLocaleString()}
              </p>
              <p>
                <strong>Revenue:</strong> ${movie?.revenue?.toLocaleString()}
              </p>
            </div>

            {(movie?.genres?.length || 0) > 0 && (
              <div className="genres">
                <strong>Genres:</strong>{" "}
                {movie?.genres.map((g) => g.name).join(", ")}
              </div>
            )}

            {(movie?.production_companies?.length || 0) > 0 && (
              <div className="companies">
                <strong>Production Companies:</strong>{" "}
                {movie?.production_companies.map((c) => c.name).join(", ")}
              </div>
            )}

            {(movie?.production_countries?.length || 0) > 0 && (
              <div className="countries">
                <strong>Countries:</strong>{" "}
                {movie?.production_countries.map((c) => c.name).join(", ")}
              </div>
            )}

            {(movie?.spoken_languages?.length || 0) > 0 && (
              <div className="languages">
                <strong>Languages:</strong>{" "}
                {movie?.spoken_languages.map((l) => l.english_name).join(", ")}
              </div>
            )}

            {movie?.homepage && (
              <a
                href={movie?.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="homepage-link"
              >
                Official Website
              </a>
            )}
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
