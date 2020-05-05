export interface MovieResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Movie {
  actors: string[];
  _id: string;
  title: string;
  genre: string;
  year: string;
  director: string;
}
