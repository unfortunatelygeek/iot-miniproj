import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      <Text>AuthLayout</Text>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLayout;