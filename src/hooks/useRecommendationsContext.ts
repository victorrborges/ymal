import { createContext, useContext } from "react";
import { RecommendationsContent } from "../types/types";

export const MyRecommendationsContext = createContext<RecommendationsContent>({
    recommendations: undefined,
    setRecommendations: () => {},
    recommendation: undefined,
    setRecommendation: () => {}
})

export const useRecommendationsContext = () => useContext(MyRecommendationsContext)