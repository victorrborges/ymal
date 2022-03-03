import { createContext, useContext } from "react";
import { SearchResultsContent } from "../types/types";

export const MySearchResultsContext = createContext<SearchResultsContent>({
  searchResults: undefined,
  setSearchResults: () => {},
});

export const useSearchResultsContext = () => useContext(MySearchResultsContext);
