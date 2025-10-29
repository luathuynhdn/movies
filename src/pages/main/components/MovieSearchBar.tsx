import React, { useState } from "react";

import "../styles/movie-search.scss";

import type { MovieSearchParams } from "@models/movie.model";

interface MovieSearchBarProps {
  onSearch: (params: MovieSearchParams) => void;
  loading: boolean;
}

export const MovieSearchBar: React.FC<MovieSearchBarProps> = ({
  onSearch,
  loading,
}) => {
  const [query, setQuery] = useState<string>();
  const [year, setYear] = useState<number | "">();
  const [region, setRegion] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [includeAdult, setIncludeAdult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    onSearch({
      query: query?.trim() || "",
      include_adult: includeAdult,
      year: year ? Number(year) : undefined,
      region: region?.trim() || "",
      language,
      page: 1,
    });
  };

  const handleReset = () => {
    setQuery(undefined);
    setYear(undefined);
    setRegion(undefined);
    setLanguage(undefined);
    setIncludeAdult(false);
    onSearch({});
  };

  return (
    <form className="movie-search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
        className="search-input"
        min={0}
        step={1}
      />

      <input
        type="text"
        placeholder="Region (e.g. US)"
        maxLength={2}
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="search-input"
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="search-select"
      >
        <option value="">Selet Language</option>
        <option value="en-US">English (US)</option>
        <option value="fr-FR">French</option>
        <option value="ja-JP">Japanese</option>
        <option value="ko-KR">Korean</option>
        <option value="es-ES">Spanish</option>
      </select>

      <label className="include-adult">
        <input
          type="checkbox"
          checked={includeAdult}
          onChange={(e) => setIncludeAdult(e.target.checked)}
        />
        <span>Include Adult</span>
      </label>

      <button type="submit" className="btn-search">
        Search
      </button>

      <button type="button" className="btn-reset" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};
