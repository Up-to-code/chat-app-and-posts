import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { styled } from "nativewind";
import ChatItem from "@/components/ChatItem";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "@/lib/firebase/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInputField from "@/components/common/SerachInputfiled";
import { useColors } from "@/hooks/useColors";
import EmptyImage from "@/assets/images/Empty.png";
const ChatList: React.FC = () => {
  const [chatData, setChatData] = useState<DocumentData[]>([]);
  let textref = useRef<string>();
  const [loding, setLoading] = useState(false);
  const { primary } = useColors();
  const mepty = Image.resolveAssetSource(EmptyImage).uri;
  const Search = () => {
    if (textref.current) {
      setLoading(true);
      const q = query(
        collection(FIREBASE_DB, "users"),
        where("email", "==", textref.current)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
          };
        });
        setChatData(data);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      Nosearch();
    }
  };
  const Nosearch = () => {
    setLoading(true);
    const q = query(collection(FIREBASE_DB, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        };
      });
      setLoading(false);
      setChatData(data);
    });
    return () => unsubscribe();
  };
  // const q = query(citiesRef, where("state", "==", "CA"));
  useEffect(() => {
    Nosearch();
  }, []);

  return (
    <>
      <View className=" bg-white">
        <SafeAreaView>
          <SearchInputField
            label="Search"
            showLabel={false}
            className=" border-none border-b"
            value=""
            onChange={(e) => {
              textref.current = e;
            }}
            onKeyPress={() => {
              console.log("textref.current", textref.current);
              Search();
            }}
            onPresslabel={() => {
              Search();
            }}
          />
        </SafeAreaView>
      </View>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <StatusBar style="light" />
          <FlashList
            onLoad={() => setLoading(false)}
            ListEmptyComponent={
              <View className=" items-center justify-center min-h-full ">
                <Image
                  source={{ uri: mepty }}
                  style={{ width: 200, height: 200 }}
                />
                <Text className="text-lg font-bold">No user found</Text>
              </View>
            }
            data={chatData}
            renderItem={({ item }) => (
              <ChatItem
                uid={item.uid}
                time=""
                name={item.name}
                message={item.email}
                avatar={item.avatar}
              />
            )}
            keyExtractor={(item) => item.id}
            estimatedItemSize={70}
          />
        </View>
        {loding && (
          <View className="bg-white flex-1">
            <ActivityIndicator size="large" color={primary} />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default styled(ChatList);
