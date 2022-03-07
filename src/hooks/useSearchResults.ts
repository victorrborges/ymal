import { createContext, useContext } from "react";
import { SearchResultsContent } from "../types/types";

export const MySearchResults = createContext<SearchResultsContent>({
  searchResults: undefined,
  setSearchResults: () => {},
});

export const useSearchResults = () => useContext(MySearchResults);
