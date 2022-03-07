import { createContext, useContext } from "react";
import { RecommendationsContent } from "../types/types";

export const MyRecommendations = createContext<RecommendationsContent>({
  recommendations: undefined,
  setRecommendations: () => {},
});

export const useRecommendations = () =>
  useContext(MyRecommendations);
