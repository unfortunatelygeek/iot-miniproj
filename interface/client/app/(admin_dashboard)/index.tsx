import React from "react";
import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" style={{ width: 24, height: 24, tintColor: color }} />
      <Text className={`${focused ? 'text-blue-500' : 'text-gray-500'} text-sm`}>
        {name}
      </Text>
    </View>
  );
};

const AdminDashLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused }) => {
          let icon;
          let name;

          if (route.name === 'home') {
            icon = icons.home;
            name = 'Home';
          } else if (route.name === 'profile') {
            icon = icons.profile;
            name = 'Profile';
          }

          return <TabIcon icon={icon} color={color} name={name} focused={focused} />;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default AdminDashLayout;