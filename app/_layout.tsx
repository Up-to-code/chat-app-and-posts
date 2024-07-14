import { AuthContextProvider, useAuth } from "@/context/AuthContext";
import { router, Slot, Stack, useSegments } from "expo-router";
import { useEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const Segments = useSegments();
  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;

    const isApp = Segments[0] == "(app)";
    if (isAuthenticated && !isApp) {
      // redirect to app
      router.replace("/(app)");
    }
    if (!isAuthenticated && isApp) {
      // redirect to login
      router.replace("/(auth)");
    }
    if (!isAuthenticated) {
      // redirect to login
      router.replace("/(auth)");
    }
  }, [isAuthenticated]);

  return <Slot />;
};
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
