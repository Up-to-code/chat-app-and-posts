import UploadImage from "@/components/uploadImage";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { createPostDoc } from "@/lib/firebase/FirebaseServes";
import { usePostImages, useUploadStore } from "@/store/PostImages";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
const { primary } = useColors();
const Addpost = () => {
  const [postText, setPostText] = useState("");
  const characterLimit = 280;
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { uri, mimeType ,setUri, setMimeType} = usePostImages();
  const { imageUrl, progress, isLoading, uploadImage } = useUploadStore();
  const handleAddPost = async () => {
    if (!user) return alert("Please sign in to add a post");

    // Check if the post text is empty
    if (postText.trim().length === 0) {
      alert("Please enter a post");
      return;
    }
    if (postText.trim().length > 0) {
      if (postText.trim().length > characterLimit) {
        alert(
          `Character limit is ${characterLimit} characters. You have entered ${
            postText.trim().length
          } characters.`
        );
        return;
      }
      if (uri.length === 0 && mimeType.length === 0) {
        // Add the post logic here
        setLoading(true);
        postText.trim();
        await createPostDoc(user.uid, postText);
        setLoading(false);
        console.log(postText); // Replace with your actual logic to add the post
        setPostText("");
      } else {
        setLoading(true);
        uploadImage(uri, mimeType);
        postText.trim();
        await createPostDoc(user.uid, postText, imageUrl);
        setLoading(false);
        setPostText("");
        setUri("");
        setMimeType("");
        
      }

      // Optional: Clear the input after adding the post
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={defaultStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white">{progress} Loading... </Text>
          </View>
        )}
        <Text style={styles.title}>Add Post</Text>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Type here..."
          value={postText}
          onChangeText={(text) => setPostText(text)}
        />
        <Text style={styles.characterCount}>
          {postText.length}/{characterLimit}
        </Text>
        <UploadImage />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#2c9e81" : primary,
            },
            styles.button,
          ]}
          onPress={handleAddPost}
        >
          <Text style={styles.buttonText}>Add Post</Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 18,
  },
  characterCount: {
    alignSelf: "flex-end",
    marginBottom: 10,
    color: "gray",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Addpost;
