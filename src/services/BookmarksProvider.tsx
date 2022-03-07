import { db } from "../firebase/config";
import { RecommendationObject } from "../types/types";

export const getBookmarks = (userId: any, setBookmarks: Function) => {
  db.collection("bookmarks")
    .where("userId", "==", userId)
    .onSnapshot((querySnapshot) => {
      setBookmarks(querySnapshot.docs.map((doc) => ( {
        id: doc.id,
        bookmark: doc.data().bookmark,
        creationDate: doc.data().creationDate
      })));
    });
};

export const addBookmark = (userId: any, bookmark: RecommendationObject) => {
  db.collection("bookmarks").add({
    userId: userId,
    bookmark: bookmark,
    creationDate: +new Date(),
  });
};

export const deleteBookmark = (id: any) => {
  db.collection("bookmarks").doc(id).delete();
};
