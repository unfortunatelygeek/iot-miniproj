import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { cssInterop } from "nativewind";

const StyledKeyboardAvoidingView = cssInterop(KeyboardAvoidingView, {className:'style'});
const StyledText = cssInterop(Text, {className:'style'});
const StyledTextInput = cssInterop(TextInput, {className:'style'});
const StyledTouchableOpacity = cssInterop(TouchableOpacity, {className:'style'});
const StyledView = cssInterop(View, {className:'style'});

const Page = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const { onLogin } = useAuth();

  const onSignInPress = async () => {
    onLogin!(username, password);
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center px-5"
    >
      <StyledText className="text-3xl text-center mb-10 font-pbold">Safai Saarthi</StyledText>
      <StyledTextInput
        autoCapitalize="none"
        placeholder="admin"
        value={username}
        onChangeText={setUsername}
        className="mb-4 h-12 border border-gray-300 rounded px-3"
      />
      <StyledTextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-4 h-12 border border-gray-300 rounded px-3"
      />
      <StyledTouchableOpacity
        onPress={onSignInPress}
        className="mt-4 items-center bg-goldenYellows-dark py-3 rounded"
      >
        <StyledText className="text-white">Sign in</StyledText>
      </StyledTouchableOpacity>
    </StyledKeyboardAvoidingView>
  );
};

export default Page;