import React from "react";
import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon} 
        resizeMode="contain" 
        style={{ 
          width: 20, 
          height: 15, 
          tintColor: color 
        }} 
      />
      <Text 
        className={`
          ${focused ? 'text-warmBrowns-dark' : 'text-gray-500'} 
          text-xxs
          font-pregular
        `}
      >
        {name}
      </Text>
    </View>
  );
};

export default function AdminDashLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: '#FFFDD0', 
          borderTopColor: '#ADB99A', 
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ color, focused }) => {
          let icon;
          let name;

          switch(route.name) {
            case 'home':
              icon = icons.home;
              name = 'Home';
              break;
            case 'profile':
              icon = icons.profile;
              name = 'Profile';
              break;
            default:
              icon = icons.home;
              name = 'Home';
          }

          return <TabIcon icon={icon} color={color} name={name} focused={focused} />;
        },
        tabBarActiveTintColor: '#A67B5B', // warmBrowns default
        tabBarInactiveTintColor: '#D2B48C', // earthyTans light
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}