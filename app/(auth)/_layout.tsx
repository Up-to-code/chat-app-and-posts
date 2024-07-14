import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="Sign-up"
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
