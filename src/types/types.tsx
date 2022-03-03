import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SearchResultsContent = {
  searchResults: any;
  setSearchResults: Function;
};

export type RecommendationsContent = {
  recommendations?: RecommendationObject[];
  setRecommendations: Function;
  recommendation?: RecommendationObject;
  setRecommendation: Function;
};

export type FormObject = {
  search: string;
};

type DefaultRecommendationsDataObject = {
  "@attr": object;
};

export type ArtistsRecommendationsDataObject =
  DefaultRecommendationsDataObject & { artist: RecommendationObject[] };
export type TracksRecommendationsDataObject =
  DefaultRecommendationsDataObject & { track: RecommendationObject[] };

type ImageRecommendationsObject = {
  size: string;
  "#text": string;
};

export type RecommendationObject = {
  image: ImageRecommendationsObject[];
  match: string;
  name: string;
  streamable: string;
  url: string;
  artist?: ArtistForTracksRecommendationsObject;
  duration?: number;
  mbid?: string;
  playcount?: number;
};

type ArtistForTracksRecommendationsObject = {
  name: string;
  mbid: string;
  url: string;
};

export type SearchDataObject = {
  meta: MetaObject;
  result: DefaultSearchResult;
};

type MetaObject = {
  page: number;
  perPage: number;
  query: object;
  total: number;
  totalPages: number;
};

export type DefaultSearchResult = {
  albums: AlbumSearchObject[];
  artists: ArtistSearchObject[];
  q: string;
  top: LastFMSearchObject;
  tracks: TrackSearchObject[];
  type: string;
};

export type LastFMSearchObject = {
  images: string[];
  listeners: number;
  name: string;
  type: string;
  top?: boolean;
  artistName?: string;
};

type AlbumSearchObject = LastFMSearchObject & { artistName: string };
export type ArtistSearchObject = LastFMSearchObject;
export type TrackSearchObject = LastFMSearchObject & {
  artistName: string;
  duration: object;
};

export type ErrorSearchObject = object;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
  Home: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
};
