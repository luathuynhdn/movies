export interface PaginationModel<T> {
  /** Optional date range info (present for some endpoints like “Now Playing”) */
  dates?: {
    maximum: string; // YYYY-MM-DD
    minimum: string; // YYYY-MM-DD
  };

  /** Current page number */
  page: number;

  /** List of results of type T */
  results: T[];

  /** Total number of pages available */
  total_pages: number;

  /** Total number of results available */
  total_results: number;
}
