import { createContext, useContext } from "react";
import { BookmarksContent } from "../types/types";

export const MyBookmarks = createContext<BookmarksContent>({
  bookmarks: undefined,
});

export const useBookmarks = () => useContext(MyBookmarks);
