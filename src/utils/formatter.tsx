import interleave from "interleave";
import { SearchDataObject } from "../types/types";

export const formatSearchObjects = (data: SearchDataObject) => {
  const result = data.result;
  const top = result.top;

  const artists = result.artists;
  const tracks = result.tracks;

  if (top) {
    if (top.type === "artist") artists.shift();
    if (top.type === "track") tracks.shift();

    top.top = true;
  }

  const nonTopResults =
    artists.length < tracks.length
      ? interleave(tracks, artists)
      : interleave(artists, tracks);

  return top ? [top].concat(nonTopResults) : nonTopResults;
};
