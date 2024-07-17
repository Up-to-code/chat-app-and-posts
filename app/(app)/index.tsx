import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
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
import { LogOut } from "@/lib/firebase/FirebaseServes";

const ChatList: React.FC = () => {
  
  const [chatData, setChatData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(FIREBASE_DB, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        };
      });
      setChatData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <Pressable className="flex-row items-center p-4 border-b border-gray-200" onPress={() => {LogOut()}}>
        <Text className="text-lg font-bold">sigin Out</Text>
      </Pressable>
      <FlashList
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
  );
};

export default styled(ChatList);
