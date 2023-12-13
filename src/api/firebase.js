import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref,get, set } from "firebase/database";
import { v4 as uuid } from "uuid";

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
const database = getDatabase(app);
// const provider = new GithubAuthProvider();
// const auth = getAuth();

export function login() {
  // Header에서 로그인버튼을 클릭하면 해당 함수 호출
  signInWithPopup(auth, provider).catch(console.error);
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
  signOut(auth).catch(console.error);
}

export function writeUserData(userId, name, email, imageUrl) {
  return set(ref(database, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    //1. 사용자가 있는 경우에 (로그인한 경우)
    const updatedUser = user ? await adminUser(user) : null; //null 대신 user 가능
    //null을 넣어도되는 이유는 adminUser에서 admin이 있으면 isAdmin이 추가된 데이터를 전달해주고 만약 없더라도 user를 전달하기 때문에 user가 ture면 어떤 데이터든 받을 수 있다.
    callback(updatedUser);
    //콜백함수를 호출하고 user값을 callback함수에 전달
  });
}

async function adminUser(user) {
  //2. 사용자가 admin을 가지고 있는지 확인
  //3. {...user, isAdmin: true/false}
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

export async function addNewProduct(product, imageURL) {
  const id = uuid();
  const category = product.category;
  return set(ref(database, `products/${category}/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageURL,
    options: product.options.toUpperCase().split(","), //콤마로 옵션을 나누면 split으로 나눠서 배열 형태로 저장
  });
}

// export async function getProducts(){
//   return get(ref(database, 'products')).then((snapshot) => {
//     if(snapshot.exists()){
//       return Object.values(snapshot.val())
//     }
//     return [];
//   })
// }

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      const categories = snapshot.val();
      let allProducts = [];
      Object.values(categories).map(category => {
        allProducts = [...allProducts, ...Object.values(category)]
      })
      return allProducts;
    }
    return [];
  });
}
