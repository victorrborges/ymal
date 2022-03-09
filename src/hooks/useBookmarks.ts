import { createContext, useContext } from "react";
import { BookmarksContent } from "../types/types";

export const MyBookmarks = createContext<BookmarksContent>({
  bookmarks: undefined,
  isDrawerOpen: false,
  setIsDrawerOpen: () => {}
});

export const useBookmarks = () => useContext(MyBookmarks);
