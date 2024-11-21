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
        headerStyle: {
          backgroundColor: '#FFFDD0', 
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          color: '#8B6B4E', 
        },
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
            case 'index':
              icon = icons.home;
              name = 'Home';
              break;
            case 'profile':
              icon = icons.profile;
              name = 'Profile';
              break;
            case 'assign':
              icon = icons.rightArrow; // Make sure this icon exists in your constants
              name = 'Assign';
              break;
            case 'dash':
              icon = icons.menu; // Make sure this icon exists in your constants
              name = 'Dash';
              break;
            // default:
            //   icon = icons.home;
            //   name = 'Home';
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
          headerTitle: "Waste Management Dashboard",
        }}
      />
      <Tabs.Screen
        name="assign"
        options={{
          title: "Assign",
          headerTitle: "Bin Assignment",
        }}
      />
      <Tabs.Screen
        name="dash"
        options={{
          title: "Dashboard",
          headerTitle: "System Metrics",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "Admin Profile",
        }}
      />
    </Tabs>
  );
}