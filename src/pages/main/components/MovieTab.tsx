import React, { useCallback, useEffect, useRef, useState } from "react";

import "../styles/movie-tab.scss";

import MovieList from "./MovieList";
import { MovieSearchBar } from "./MovieSearchBar";
import { MovieCategory } from "@constants/movie.constant";
import * as movieAction from "@repositories/movie.repository";
import type { MovieSearchParams, MovieModel } from "@models/movie.model";
import ViewSwitch from "./ViewSwitch";

export const MovieTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MovieCategory>(
    MovieCategory.NOW_PLAYING
  );
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [searchParams, setSearchParams] = useState<MovieSearchParams>({});
  const [viewType, setViewType] = useState<"gridView" | "listView">("gridView");

  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      let res = null;
      if (activeTab === MovieCategory.SEARCH) {
        if (!searchParams.query) return setPage(2);
        res = await movieAction.getMoviesBySearchCondition({
          ...searchParams,
          page,
        });
      } else {
        res = await movieAction.getMovies(activeTab, page);
      }
      if (res?.results) {
        setMovies((prev) => {
          // merge & filter duplicates
          const merged = [...prev, ...res.results];
          const unique = merged.filter(
            (movie, index, self) =>
              index === self.findIndex((m) => m.id === movie.id)
          );
          return unique;
        });
        setHasMore(page < res.total_pages);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setHasMore(false);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, activeTab, searchParams]);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMovies();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMovies]
  );

  useEffect(() => {
    // Reset when category changes
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [activeTab, searchParams]);

  useEffect(() => {
    if (page === 1) loadMovies();
  }, [page]);

  return (
    <div
      className={`movie-tabs-container movie-search-wrapper ${
        activeTab === MovieCategory.SEARCH ? "open" : ""
      }`}
    >
      <div className="tab-bar">
        <button
          className={`tab ${
            activeTab === MovieCategory.NOW_PLAYING ? "active" : ""
          }`}
          onClick={() => setActiveTab(MovieCategory.NOW_PLAYING)}
          disabled={loading}
        >
          🎬 Now Playing
        </button>
        <button
          className={`tab ${
            activeTab === MovieCategory.TOP_RATED ? "active" : ""
          }`}
          onClick={() => setActiveTab(MovieCategory.TOP_RATED)}
          disabled={loading}
        >
          ⭐ Top Rated
        </button>

        <button
          type="button"
          className={`btn-toggle-search tab ${
            activeTab === MovieCategory.SEARCH ? "active" : ""
          }`}
          onClick={() => setActiveTab(MovieCategory.SEARCH)}
          disabled={loading}
        >
          🔎 Search
        </button>

        <ViewSwitch onChange={(view) => setViewType(view)} view={viewType} />
      </div>
      <MovieSearchBar onSearch={(p) => setSearchParams(p)} loading={loading} />

      <MovieList
        movies={movies}
        lastMovieRef={lastMovieRef}
        error={error}
        loading={loading}
        viewType={viewType}
      />
    </div>
  );
};
