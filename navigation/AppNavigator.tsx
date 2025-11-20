import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";
import QuizScreen from "../screens/Quiz/QuizScreen";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0F172A",
    }}
  >
    <ActivityIndicator size="large" color="#3B82F6" />
  </View>
);

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        if (currentUser) {
          const quizStatus = await AsyncStorage.getItem("quizDone");
          setIsQuizDone(quizStatus === "true");
        } else {
          setIsQuizDone(false);
        }
      } catch (error) {
        console.error("Error checking quiz status:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <QuizeScreen />
      {/* {!user ? (
        <AuthStack />
      ) : !isQuizDone ? (
        <QuizScreen />
      ) : (
        <BottomTabs />
      )} */}
    </NavigationContainer>
  );
}