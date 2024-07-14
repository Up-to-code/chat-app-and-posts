import { Stack, Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
    </Tabs>
  );
};
export default MainLayout;
