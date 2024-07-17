import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "./FirebaseConfig";
import {
  getStorage,
  uploadBytes,
  listAll,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export const LogOut = async () => {
  await FIREBASE_AUTH.signOut();
};
export const createUserDoc = async (
  email: string,
  uid: string,
  name: string
) => {
  const ref = doc(FIREBASE_DB, "users", uid);
  const data = {
    email,
    uid,
    name,
    verified: false,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/first-app-fed81.appspot.com/o/src%2Fuser.png?alt=media&token=463ba34a-6960-4783-a5dd-078dd6bb812c",
  };
  try {
    await setDoc(ref, data);
  } catch (error) {
    console.log(error);
  }
};

export const createPostDoc = async (
  uid: string,
  text: string,
  image?: string,
  video?: string
) => {
  try {
    if (image) {
      const Doc = await addDoc(collection(FIREBASE_DB, "posts"), {
        uid,
        text,
        image,
        createed: Timestamp.fromDate(new Date()),
      });
      return Doc;
    }
    if (video) {
      const Doc = await addDoc(collection(FIREBASE_DB, "posts"), {
        uid,
        text,
        video,
        createed: Timestamp.fromDate(new Date()),
      });
      return Doc;
    }
    if (!image && !video) {
      const Doc = await addDoc(collection(FIREBASE_DB, "posts"), {
        uid,
        text,
        createed: Timestamp.fromDate(new Date()),
      });
      return Doc;
    }
  } catch (error) {
    console.log(error);
  }
};

/// storage
export const onUploadImage = async ({
  name,
  uri,
  isUser,
}: {
  name: string;
  uri: string;
  isUser: boolean;
}) => {
  const res = await fetch(uri);
  const blob = await res.blob();
  const storage = getStorage(FIREBASE_APP);
  const storageRef = ref(
    storage,
    `images/${isUser ? name : "posts"}/${Date.now()}`
  );
  const uploadTask = uploadBytesResumable(storageRef, blob);
  return uploadTask;
};
