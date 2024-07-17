import { create } from "zustand";

export const useImageStore = create((set) => ({
  imageUrl: "",
  setImageUrl: (url: string) => set({ imageUrl: url }),
}));

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FIREBASE_APP } from "@/lib/firebase/FirebaseConfig";

interface UploadState {
  imageUrl: string;
  progress: number;
  isLoading: boolean;
  setImageUrl: (url: string) => void;
  setProgress: (progress: number) => void;
  setIsLoading: (loading: boolean) => void;
  uploadImage: (uri: string, mimeType: string) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  imageUrl: "",
  progress: 0,
  isLoading: false,
  setImageUrl: (url) => set(() => ({ imageUrl: url })),
  setProgress: (progress) => set(() => ({ progress })),
  setIsLoading: (loading) => set(() => ({ isLoading: loading })),
  uploadImage: async (uri: string, mimeType: string) => {
    set(() => ({ isLoading: true }));
    const res = await fetch(uri);
    const blob = await res.blob();
    const storage = getStorage(FIREBASE_APP);
    const storageRef = ref(storage, `images/${Date.now()}${mimeType}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        set(() => ({ progress: progressPercent }));
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        //   default:
        //     break;
        // }
      },
      (error) => {
        console.log(error);
        set(() => ({ isLoading: false }));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(() => ({ imageUrl: downloadURL, isLoading: false }));
        });
      }
    );
  },
}));

// store\PostImages.ts
interface PostImagesState {
  uri: string;
  setUri: (uri: string) => void;
  mimeType: string;
  setMimeType: (mimeType: string) => void;
}

export const usePostImages = create<PostImagesState>((set) => ({
  uri: "",
  setUri: (uri: string) => set(() => ({ uri })),
  mimeType: "",
  setMimeType: (mimeType: string) => set(() => ({ mimeType })),
}));
