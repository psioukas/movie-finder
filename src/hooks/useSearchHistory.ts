import { useContext } from "react";
import {
  SearchHistoryContext,
  SearchHistoryContextType,
} from "../contexts/SearchHistoryContext.tsx";

export default function useSearchHistory(): SearchHistoryContextType {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error("SearchHistoryContext is undefined");
  }

  return context;
}
