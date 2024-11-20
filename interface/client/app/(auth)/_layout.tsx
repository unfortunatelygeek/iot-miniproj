import { View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';
import { cssInterop } from "nativewind";

const StyledView = cssInterop(View, { className: 'style' });

const AuthLayout = () => {
  return (
    <StyledView className="flex-1 bg-gray-50">
      <Slot />
    </StyledView>
  );
};

export default AuthLayout;

