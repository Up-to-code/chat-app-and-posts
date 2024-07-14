import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "./FirebaseConfig";

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
  };
  try {
    await setDoc(ref, data);
  } catch (error) {
    console.log(error);
  }
};
