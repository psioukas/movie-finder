import isEmptyString from "./index.ts";

const OMDB_BASE_URL = "https://www.omdbapi.com";
const IMDB_BASE_URL = "https://www.imdb.com";

export function constructSearchUrl(searchTerm: string): string {
  if (!isEmptyString(searchTerm)) {
    const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const url = new URL(OMDB_BASE_URL);
    url.searchParams.set("s", searchTerm);
    url.searchParams.set("r", "json");
    url.searchParams.set("apiKey", OMDB_API_KEY);

    return url.href;
  }

  throw new Error("Search term is missing!");
}

export function constructImdbUrl(titleId: string): string {
  const url = new URL(IMDB_BASE_URL);

  url.pathname = `title/${titleId}`;
  return url.href;
}
