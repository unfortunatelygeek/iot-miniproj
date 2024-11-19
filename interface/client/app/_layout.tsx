import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Slot, SplashScreen, Stack, useSegments, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import "../globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const { authState } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
    const inAuthGroup = segments[0]?.includes('(protected)');

		if (!authState?.authenticated && inAuthGroup) {
			router.replace('/');
		} else if (authState?.authenticated === true) {
			router.replace('/(protected)');
		}
	}, [authState]);

  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
  </Stack>
}

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-ExtraBold": require('../assets/fonts/Poppins-ExtraBold.ttf'),
    "Poppins-ExtraLight": require('../assets/fonts/Poppins-ExtraLight.ttf'),
    "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
    "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-SemiBold": require('../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Thin": require('../assets/fonts/Poppins-Thin.ttf')
  });

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;
