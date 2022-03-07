import { firebase } from "../firebase/config";

export const auth = (setAuthenticated: Function) => {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      setAuthenticated(true);
    })
    .catch((error: any) => {
      setAuthenticated(false);
      console.error( error);
    });
};

export const getUserId = (setUserId: Function) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserId(user.uid);
    }
  });
};
