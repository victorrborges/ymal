import LastFM from "last-fm";
import { LAST_FM_API_KEY } from "react-native-dotenv";
import {
  ArtistsRecommendationsDataObject,
  ErrorSearchObject,
  LastFMSearchObject,
  RecommendationObject,
  SearchDataObject,
  TrackSearchObject,
  TracksRecommendationsDataObject,
} from "../types/types";
import { formatSearchObjects } from "../utils/formatter";

const DEFAULT_LIMIT = 20;
const SEARCH_RESULTS_LIMIT = DEFAULT_LIMIT / 2;

const lastfm = new LastFM(LAST_FM_API_KEY);

export const getSearchResults = (search: string, callback: Function) => {
  lastfm.search(
    { q: search, limit: SEARCH_RESULTS_LIMIT },
    (err: ErrorSearchObject, data: SearchDataObject) => {
      if (err) console.error(err);
      else {
        const result = formatSearchObjects(data);
        callback(result);
      }
    }
  );
};

export const getArtistRecommendations = (
  artist: LastFMSearchObject,
  callback: Function
) => {
  lastfm.artistSimilar(
    { name: artist.name, limit: DEFAULT_LIMIT },
    (err: ErrorSearchObject, data: ArtistsRecommendationsDataObject) => {
      if (err) console.error(err);
      else callback(data.artist);
    }
  );
};

export const getTracksRecommendations = (
  track: LastFMSearchObject,
  callback: Function
) => {
  lastfm.trackSimilar(
    {
      name: track.name,
      artistName: (track as unknown as TrackSearchObject).artistName,
      limit: DEFAULT_LIMIT,
    },
    (err: ErrorSearchObject, data: TracksRecommendationsDataObject) => {
      if (err) console.error(err);
      else callback(data.track);
    }
  );
};

export const getArtistInfo = (
  artist: RecommendationObject,
  callback: Function
) => {
  lastfm.artistInfo(
    { name: artist.name, limit: DEFAULT_LIMIT },
    (err: ErrorSearchObject, data: ArtistsRecommendationsDataObject) => {
      if (err) console.error(err);
      else callback(data);
    }
  );
};

export const getArtistTopTrack = (
  artist: RecommendationObject,
  callback: Function
) => {
  lastfm.artistTopTracks(
    { name: artist.name, limit: 1 },
    (err: ErrorSearchObject, data: any) => {
      if (err) console.error(err);
      else {
        data.result[0].artist = { name: data.result[0].artistName };
        getTracksInfo(
          data.result[0] as unknown as RecommendationObject,
          callback
        );
      }
    }
  );
};

export const getTracksInfo = (
  track: RecommendationObject,
  callback: Function
) => {
  lastfm.trackInfo(
    {
      name: track.name,
      artistName: track.artist?.name,
      limit: DEFAULT_LIMIT,
    },
    (err: ErrorSearchObject, data: TracksRecommendationsDataObject) => {
      if (err) console.error(err);
      else callback(data);
    }
  );
};
