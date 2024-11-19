import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../globals.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pbold">Aditi!</Text>
      <StatusBar style = 'auto' />
      <Link href="/profile" style = {{ color: "blue" }}>
        Go to Profile
      </Link>
    </View>
  );
}
