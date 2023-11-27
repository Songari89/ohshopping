import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
// import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const provider = new GithubAuthProvider();
// const auth = getAuth();

export function login() {
  // Header에서 로그인버튼을 클릭하면 해당 함수 호출
  signInWithPopup(auth, provider)
    .catch(console.error);
  //catch(error => console.error(error))

  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const user = result.user;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
}

export function logout() {
  // Header에서 로그인버튼을 클릭하면 해당 함수 호출
  signOut(auth)
    .catch(console.error);
}

export function onUserStateChange(callback){
  onAuthStateChanged(auth, (user) => {
    callback(user)
    //콜백함수를 호출하고 user값을 callback함수에 전달
  });
}