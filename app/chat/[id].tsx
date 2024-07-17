import { useAuth } from "@/context/AuthContext";
import { getRoomid } from "@/lib/common";
import { FIREBASE_DB } from "@/lib/firebase/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const textRef = useRef("");
  const InputRef = useRef<TextInput>(null);
  const flashListRef = useRef<FlashList<DocumentData>>(null);
  const scrollToBottom = () => {
    flashListRef.current?.scrollToEnd({ animated: true });
  };
  useEffect(() => {
    createConversation();
    if (id) {
      const roomid = getRoomid(user.uid, id as string);
      const docRef = doc(FIREBASE_DB, "conversations", roomid);
      const col = collection(docRef, "messages");
      const q = query(col, orderBy("createed", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
          };
        });
        setMessages(data);
      });
      if (messages.length > 0) {
        scrollToBottom();
      }
      return () => unsubscribe();
    }
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [id]);
  const createConversation = async () => {
    if (!id) return;
    const roomid = getRoomid(user.uid, id as string);
    console.log(roomid);
    await setDoc(doc(FIREBASE_DB, "conversations", roomid), {
      members: [user.uid, id],
      roomid,
      createed: Timestamp.fromDate(new Date()),
    });
  };

  const sendMessage = async () => {
    const massage = textRef.current;
    console.log(massage);
    if (!massage || !id) return;
    try {
      const roomid = getRoomid(user.uid, id as string);
      const docRef = doc(FIREBASE_DB, "conversations", roomid);
      const col = collection(docRef, "messages");
      const adddoc = await addDoc(col, {
        text: massage,
        sender: user.uid,
        createed: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", adddoc.id);

      InputRef.current?.clear();
      scrollToBottom();
    } catch (error) {
      console.log(error);
      textRef.current = "";
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="text-xl font-bold m-4">Chat </Text>
      <View className="flex-1 p-2">
        <FlashList
          ref={flashListRef}
          data={messages}
          renderItem={({ item }) => (
            <View
              key={item.id}
              className={` flex my-2  ${
                user.uid === item.sender ? "items-end" : " items-start"
              } `}
            >
              {user.uid === item.sender ? (
                <View className="bg-green-500 p-4 rounded-l-lg rounded-tr-lg">
                  <Text className="text-white font-bold text-lg">
                    {item.text}
                  </Text>
                </View>
              ) : (
                <View className="bg-white p-4 rounded-r-lg rounded-tl-lg">
                  <Text className="text-black font-bold text-lg">
                    {item.text}
                  </Text>
                </View>
              )}
            </View>
          )}
          estimatedItemSize={100}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="p-4"
      >
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-md">
          <TextInput
            onFocus={() => setTimeout(() => scrollToBottom(), 100)}
            ref={InputRef}
            onChange={(e) => {
              textRef.current = e.nativeEvent.text;
            }}
            className="flex-1 text-lg px-4 py-2 border-none"
            placeholder="Type a message"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            className="bg-green-500 rounded-full py-2 px-4 ml-2"
            onPress={sendMessage}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}