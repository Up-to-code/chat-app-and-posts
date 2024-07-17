import { useColors } from "@/hooks/useColors";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, Stack, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

const size = 26;
const MainLayout = () => {
  const { primary, secondary, tertiary, quaternary } = useColors();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: primary,
        },
        tabBarStyle: {
          height: 60,
          borderTopWidth: 2,
          backgroundColor: "#fff",
        },
        tabBarLabel: () => null,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        title: "Welcome",
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={() => router.push("/Search")}>
              <FontAwesome
                name="search"
                size={size - 4}
                color={"white"}
                style={{ marginRight: 20 }}
              />
            </Pressable>
            <View style={{ marginRight: 10 }} className="relative">
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: tertiary,
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              />

              <Ionicons name="notifications" size={24} color="white" />
            </View>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="posts"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="home" size={size} color={primary} />
            ) : (
              <Entypo name="home" size={size} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="addpost"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="plus" size={size} color={primary} />
            ) : (
              <Entypo name="plus" size={size} color={color} />
            ),
        }}
      />

      {/* <Tabs.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="search" size={size} color={primary} />
            ) : (
              <FontAwesome name="search" size={size} color={color} />
            ),
        }}
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: "chats",

          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="chat" size={size} color={primary} />
            ) : (
              <Entypo name="chat" size={size} color={color} />
            ),
        }}
      />
    </Tabs>
  );
};
export default MainLayout;
