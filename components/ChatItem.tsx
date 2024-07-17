import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styled } from "nativewind";
import { router } from "expo-router";

type ChatItemProps = {
  name: string;
  message: string;
  time: string;
  avatar: string;
  uid: string;
};

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  message,
  time,
  avatar,
  uid,
}) => {
  return (
    <Pressable onPress={() => router.push(`/chat/${uid}`)}>
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
        <View className="flex-1 ml-4">
          <Text className="text-base font-bold">{name}</Text>
          <Text className="text-sm text-gray-500">{message}</Text>
        </View>
        <Text className="text-xs text-gray-400">{time}</Text>
      </View>
    </Pressable>
  );
};

export default styled(ChatItem);
