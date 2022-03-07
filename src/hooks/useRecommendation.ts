import { createContext, useContext } from "react";
import { RecommendationContent } from "../types/types";

export const MyRecommendation = createContext<RecommendationContent>({
  recommendation: undefined,
  setRecommendation: () => {},
});

export const useRecommendation = () =>
  useContext(MyRecommendation);
