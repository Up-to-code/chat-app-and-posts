import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LogOut } from "@/lib/firebase/FirebaseServes";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
const index = () => {
  const [loading, setLoading] = React.useState(false);
  const Logout = async () => {
    setLoading(true);
    await LogOut();
    setLoading(false);
  };
  const data = [
    {
      id: 1,
      name: "Item 1",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Item 2",
      image: "https://picsum.photos/200/300",
    },
  ];
  return (
    <View>
      <SafeAreaView>
        <Text className="text-3xl mt-4 font-bold">index</Text>
        <View style={{ height: 200 }}>
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <View className=" p-4 rounded mt-4  ">
                <TouchableOpacity
                  onPress={() => router.push(`/chat/${item.id}`)}
                >
                  <Text
                    style={{ color: "red", textAlign: "center" }}
                    className="text-lg"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            estimatedItemSize={84}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;
{
  /* <Text className="text-3xl mt-4 font-bold">index</Text>
        <Pressable
          className="bg-red-500 p-4 rounded mt-4  "
          onPress={() => {
            Logout();
          }}
        >
          {loading && (
            <View style={defaultStyles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <Text>Pressable</Text>
        </Pressable> */
}
