import { useBookmarks } from "../hooks/useBookmarks";
import SearchForm from "./SearchForm";
import SearchResultsList from "./SearchResultsList";

export default function SearchSection() {
  const { isDrawerOpen } = useBookmarks();
  
  return (
    <>
      { !isDrawerOpen && (
        <>
          <SearchForm />
          <SearchResultsList />
        </>
      )}
    </>
  );
}
