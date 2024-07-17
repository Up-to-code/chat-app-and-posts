import { useColors } from "@/hooks/useColors";
import { FIREBASE_DB } from "@/lib/firebase/FirebaseConfig";
import { formatDate } from "@/lib/firebase/timestamp";
import { MaterialIcons } from "@expo/vector-icons";
import { getDoc, doc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import {Video , AVPlaybackStatus ,ResizeMode} from "expo-av"



interface Post {
  text: string;
  uid: string;
  image?: string;
  video?: string;
  createed: Timestamp;
}

interface User {
  uid: string;
}

interface Props {
  item: Post;
  user: User;
}

const { primary } = useColors();
const PostCard: React.FC<Props> = ({ item, user }) => {
  const { uid } = item;
  const [UserData, setUserData] = useState<any>({});
  const [expanded, setExpanded] = useState(false);
  console.log(item.image);
  useEffect(() => {
    const fetchData = async () => {
      const fechuser = await getDoc(doc(FIREBASE_DB, "users", uid));
      setUserData(fechuser.data());
    };
    fetchData();
  }, [uid]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderText = () => {
    const maxLines = expanded ? undefined : 5;
    const textToDisplay = item.text || ""; // Handle case where item.text is undefined

    return (
      <Text numberOfLines={maxLines} style={styles.title}>
        {textToDisplay}
      </Text>
    );
  };

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", marginBottom: 10, gap: 10 }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: UserData?.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          {UserData?.verified && (
            <MaterialIcons
              style={{
                backgroundColor: "#fff",
                borderRadius: 50,
                position: "absolute",
                right: -10,
                bottom: -5,
              }}
              name="verified"
              size={24}
              color={primary}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{UserData?.name}</Text>
          <Text style={{ color: "gray" }}>{formatDate(item.createed)}</Text>
        </View>
      </View>
      {renderText()}
      {item.text && item.text.split("\n").length > 5 && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={{ color: primary }}>
            {expanded ? "Read less" : "Read more"}
          </Text>
        </TouchableOpacity>
      )}
      {item.image && (
        <View
          style={{
            width: "100%",
            height: 200,
            marginVertical: 10,
            backgroundColor: "#efefef",
            borderRadius: 10,
          }}
        >
          <Image
            resizeMode="contain"
            source={
              item.image
                ? { uri: item.image }
                : { uri: "https://picsum.photos/200/300" }
            }
            style={{
              width: "100%",
              height: "90%",
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        </View>
      )}
      {item.video && (
        <View
          style={{
            width: "100%",
            height: 200,
            marginTop: 10,
            backgroundColor: "#000",
          }}
          
        >
          {/* <Video
            
            source={{ uri: item.video }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            style={{ width: "100%", height: "90%" }}
          /> */}
        </View>
      )}
      <Text style={{ fontSize: 14, color: "gray" }}>
        Posted by: {item.uid === user.uid ? "You" : "Anonymous"}
      </Text>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
