import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";
import QuizScreen from "../screens/Quiz/QuizScreen";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

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
  const [user, setUser] = useState<User | null>(null);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        if (currentUser) {
          const quizStatus = await AsyncStorage.getItem(`quizDone_${currentUser.uid}`);
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : !isQuizDone ? (
          <Stack.Screen name="Quiz">
            {(props) => <QuizScreen {...props} onFinish={() => setIsQuizDone(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}