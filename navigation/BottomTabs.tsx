import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { Text } from "react-native";
import CameraScreen from "../screens/Camera/CameraScreen";

const Tab = createBottomTabNavigator();



export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#1E293B",
          borderTopColor: "#334155",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />

      <Tab.Screen
        name="Scan"
        children={({ navigation }) => (
          <CameraScreen onClose={() => navigation.navigate("Home")} />
        )}
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📷</Text>,
          tabBarStyle: { display: "none" }, // Hide tab bar when on camera
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
