import LastFM from "last-fm";
import { LAST_FM_API_KEY } from "react-native-dotenv";
import {
  ArtistsRecommendationsDataObject,
  ErrorSearchObject,
  LastFMSearchObject,
  SearchDataObject,
  TrackSearchObject,
  TracksRecommendationsDataObject,
} from "../types/types";
import { formatSearchObjects } from "../utils/formatter";

const lastfm = new LastFM(LAST_FM_API_KEY);

export const getSearchResults = (search: string, callback: Function) => {
  lastfm.search(
    { q: search, limit: 5 },
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
    { name: artist.name, limit: 10 },
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
      limit: 10,
    },
    (err: ErrorSearchObject, data: TracksRecommendationsDataObject) => {
      if (err) console.error(err);
      else callback(data.track);
    }
  );
};
