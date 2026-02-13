import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarStyle: {
          backgroundColor: "#FF69B4", // Hot Pink
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
        },
        headerShown: false,
      }}
    >
      {/* 1. Home is now first */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* 2. Playlist (index) is now second */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Playlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
