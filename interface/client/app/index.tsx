import { Text, View, ImageBackground, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { Loader } from "../components/Loader";
import "../globals.css";

const StyledView = cssInterop(View, { className: 'style' });
const StyledText = cssInterop(Text, { className: 'style' });
const StyledImageBackground = cssInterop(ImageBackground, { className: 'style' });
const StyledTouchableOpacity = cssInterop(TouchableOpacity, { className: 'style' });

export default function App() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => setShowContent(true), 500);
  };

  return (
    <StyledView className="flex-1">
      <StatusBar style="auto" />
      
      <StyledImageBackground
        source={require('../assets/images/safai_onboarding_screen.jpg')}
        className="flex-1 justify-center items-center"
        resizeMode="cover"
        onLoadStart={() => {
          setImageLoaded(false);
          setShowContent(false);
        }}
        onLoadEnd={handleImageLoad}
        {...Platform.select({
          ios: {
            loading: 'eager',
            resizeMethod: 'resize',
          },
          android: {
            progressiveRenderingEnabled: true,
          },
        })}
      >
        {!showContent ? (
          <StyledView className="absolute inset-0 bg-amber-950 items-center justify-center">
            <Loader size={80} color="#D9C8B1" />
            <StyledText className="text-white mt-4 text-lg">
              Loading Safai Saarthi...
            </StyledText>
          </StyledView>
        ) : (
          <StyledView 
            className="p-6 bg-black/50 rounded-lg m-4"
            style={{
              opacity: showContent ? 1 : 0,
              transform: [{ scale: showContent ? 1 : 0.95 }],
            }}
          >
            <StyledText className="text-white text-3xl font-bold mb-4 text-center">
              Welcome to Safai Saarthi!
            </StyledText>
            
            <StyledText className="text-white text-lg mb-8 text-center">
              Your companion for a cleaner and greener environment. Join us in making a difference.
            </StyledText>

            <StyledView className="space-y-4">

              <Link href="/(auth)" asChild>
                <StyledTouchableOpacity className="bg-yellow-950 py-3 px-6 rounded-full">
                  <StyledText className="text-white text-center font-semibold text-lg">
                    Go to Login
                  </StyledText>
                </StyledTouchableOpacity>
              </Link>
            </StyledView>
          </StyledView>
        )}
      </StyledImageBackground>
    </StyledView>
  );
}