import PostCard from "@/components/Post";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@/context/AuthContext";
import { FIREBASE_DB } from "@/lib/firebase/FirebaseConfig";
import { FlashList } from "@shopify/flash-list";
import { query, collection, onSnapshot, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Post {
  id: string;
  text: string;
  uid: string;
  image?: string;
  video?: string;
  createed: Timestamp;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const q = query(collection(FIREBASE_DB, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data: Post[] = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Post[];
          setPosts(data);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <FlashList
        data={posts}
        renderItem={({ item }) => <PostCard item={item} user={user} />}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
});

export default Posts;
