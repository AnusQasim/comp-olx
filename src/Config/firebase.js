// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBy6HwCB1XLfbHVlmNCIdkh49RtIU14rjA",
  authDomain: "ecommerce-a497f.firebaseapp.com",
  projectId: "ecommerce-a497f",
  storageBucket: "ecommerce-a497f.appspot.com",
  messagingSenderId: "445780630543",
  appId: "1:445780630543:web:f94a09d61a819b156d977a",
  measurementId: "G-X1P446FVMY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, "ads"));
  const products = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

async function register(userInfo) {
  const { fullname, age, email, password } = userInfo;
  console.log("userInfo:", userInfo);
  const {
    user: { uid },
  } = await createUserWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, "user", uid);
  await setDoc(userRef, { email, age, fullname });

  alert("Register Successfully");
}

async function login(userInfo) {
  const { email, password } = userInfo;
  await signInWithEmailAndPassword(auth, email, password);
  alert("Logged In successfully");
}

// POst ADD
async function postAd(title, description, price, image) {
  try {
    const imageUrl = await uploadImage(image);
    await addDoc(collection(db, "ads"), {
      title,
      description,
      price,
      imageUrl,
    });
    Swal.fire("Success!", "Ad posted successfully!!", "success");
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
}

// async function uploadImage(image) {
//   try {
//     const storageRef = ref(storage, "ads/ad.png");
//     await uploadBytes(storageRef, image);
//     const url = await getDownloadURL(storageRef);
//     return url;
//   } catch (error) {
//     Swal.fire("Error!", error.message, "error");
//   }
// }

async function uploadImage(image) {
  try {
    // Generate a unique filename using the current timestamp
    const timestamp = new Date().getTime();
    const filename = `ad_${timestamp}.png`;

    const storageRef = ref(storage, `ads/${filename}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
}

async function getAds() {
  try {
    const querySnapshot = await getDocs(collection(db, "ads"));
    const ads = [];
    querySnapshot.forEach((doc) => {
      ads.push(doc.data());
    });
    return ads;
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
}

export { register, login, postAd, getAds, getAllProducts };
