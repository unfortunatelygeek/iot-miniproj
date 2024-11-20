// index.tsx
import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { cssInterop } from "nativewind";

const StyledKeyboardAvoidingView = cssInterop(KeyboardAvoidingView, { className: 'style' });
const StyledText = cssInterop(Text, { className: 'style' });
const StyledTextInput = cssInterop(TextInput, { className: 'style' });
const StyledTouchableOpacity = cssInterop(TouchableOpacity, { className: 'style' });
const StyledView = cssInterop(View, { className: 'style' });
const StyledSafeAreaView = cssInterop(SafeAreaView, { className: 'style' });

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { onLogin } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSignInPress = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await onLogin!(username, password);
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6 py-12"
      >
        <StyledView className="w-full max-w-md mx-auto">
          <StyledView className="space-y-12">
            {/* Header */}
            <StyledView className="space-y-4">
              <StyledText className="text-4xl text-center font-pbold text-gray-800">
                Safai Saarthi
              </StyledText>
              <StyledText className="text-center text-gray-500 text-lg">
                Login to your account
              </StyledText>
            </StyledView>

            <StyledView className="space-y-6">
              {/* Username Input */}
              <StyledView className="space-y-2">
                <StyledText className="text-sm font-medium text-gray-700 ml-1">
                  Username
                </StyledText>
                <StyledTextInput
                  autoCapitalize="none"
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    setErrors(prev => ({ ...prev, username: "" }));
                  }}
                  className={`h-14 border-2 rounded-xl px-4 bg-white ${
                    errors.username ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholderTextColor="#9CA3AF"
                  editable={!isLoading}
                />
                {errors.username ? (
                  <StyledText className="text-red-500 text-sm ml-1">
                    {errors.username}
                  </StyledText>
                ) : null}
              </StyledView>

              {/* Password Input */}
              <StyledView className="space-y-2">
                <StyledText className="text-sm font-medium text-gray-700 ml-1">
                  Password
                </StyledText>
                <StyledTextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  secureTextEntry
                  className={`h-14 border-2 rounded-xl px-4 bg-white ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholderTextColor="#9CA3AF"
                  editable={!isLoading}
                />
                {errors.password ? (
                  <StyledText className="text-red-500 text-sm ml-1">
                    {errors.password}
                  </StyledText>
                ) : null}
              </StyledView>

              {/* Login Button */}
              <StyledTouchableOpacity
                onPress={onSignInPress}
                disabled={isLoading}
                className={`h-14 items-center justify-center rounded-xl mt-4 ${
                  isLoading ? "bg-gray-400" : "bg-goldenYellows-dark"
                }`}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <StyledText className="text-white font-semibold text-lg">
                    Sign in
                  </StyledText>
                )}
              </StyledTouchableOpacity>
            </StyledView>

            {/* Demo Credentials */}
            <StyledView className="space-y-3 bg-white p-6 rounded-xl border border-gray-200">
              <StyledText className="text-center text-gray-700 font-medium">
                Demo Credentials
              </StyledText>
              <StyledView className="space-y-2">
                <StyledText className="text-center text-gray-600">
                  Admin: admin / admin
                </StyledText>
                <StyledText className="text-center text-gray-600">
                  Driver: driver / driver
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default Page;