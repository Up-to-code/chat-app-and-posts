import { useColors } from "@/hooks/useColors";
import { usePostImages } from "@/store/PostImages";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
const { primary } = useColors();
const UploadImage = () => {
  const { uri, setUri, setMimeType } = usePostImages();

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0].mimeType === "image/jpg") setMimeType(".jpg");
      if (result.assets[0].mimeType === "image/png") setMimeType(".png");
      setUri(result.assets[0].uri);
    }
  };

  //   const handleUploadImage = async (uri: string) => {
  //     const res = await fetch(uri);
  //     const blob = await res.blob();
  //     const storage = getStorage(FIREBASE_APP);
  //     const storageRef = ref(storage, `images/${Date.now()}${mimeType}`);
  //     const uploadTask = uploadBytesResumable(storageRef, blob);

  //     return uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progressPercent =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         setProgress(progressPercent);
  //         setIsloading(true);
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           console.log("File available at", downloadURL);
  //         });
  //       }
  //     );
  //   };

  return (
    <>
      {uri ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleChooseImage} activeOpacity={0.7}>
            <Image
              className=" my-5 "
              source={{ uri: uri }}
              style={{ width: 200, height: 200, borderRadius: 10 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View className=" flex justify-end  items-end">
          <TouchableOpacity
            className="my-5 w-[50px]"
            style={styles.button}
            onPress={handleChooseImage}
          >
            <FontAwesome name="image" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      {/* {image ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUploadImage(image)}
        >
          <FontAwesome name="upload" size={24} color="white" />
        </TouchableOpacity>
      ) : null} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#e7e7e7",
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: primary,

    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default UploadImage;
