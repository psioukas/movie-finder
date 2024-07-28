import { createContext, ReactNode, useState } from "react";
import { constructSearchUrl } from "../utils/api.ts";
import { ApiSearchResult, ApiSearchResultSchema } from "../types.ts";

export type SearchHistoryContextType = {
  isLoading: boolean;
  searchResults: Map<string, ApiSearchResult>;
  handleSearchApi: (searchTerm: string) => Promise<ApiSearchResult | undefined>;
  error: string | null;
  clearError: VoidFunction;
};

export const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

export function SearchHistoryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<
    Map<string, ApiSearchResult>
  >(new Map());

  function clearError() {
    setError(null);
  }

  function addResult(searchTerm: string, searchResult: ApiSearchResult) {
    checkSearchResultForErrors(searchResult);
    setSearchResults((prev) => prev.set(searchTerm, searchResult));
  }

  function checkSearchResultForErrors(apiSearchResult: ApiSearchResult) {
    if (apiSearchResult.Response === "False") {
      setError(apiSearchResult.Error);
    }
  }

  async function handleSearchApi(searchTerm: string) {
    try {
      clearError();
      setIsLoading(true);

      if (searchResults.has(searchTerm)) {
        const cachedResults = searchResults.get(searchTerm);
        if (cachedResults !== undefined) {
          checkSearchResultForErrors(cachedResults);
          return cachedResults;
        }
      }

      const response = await fetch(constructSearchUrl(searchTerm));
      const data = await response.json();

      const parsedData = ApiSearchResultSchema.parse(data);
      addResult(searchTerm, parsedData);
      return parsedData;
    } catch (e) {
      console.error("Error will searching api:", e);
      setError("Search failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SearchHistoryContext.Provider
      value={{
        isLoading,
        searchResults,
        handleSearchApi,
        error,
        clearError,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}
