import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";
import { SafeAreaProvider } from 'react-native-safe-area-context';
const MCQ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the most important nutrient for bone health?',
    options: ['Calcium', 'Protein', 'Carbohydrates', 'Fat'],
    correct: 'Calcium',
  },
  {
    id: 2,
    question: 'Which vitamin helps with immune system?',
    options: ['Vitamin D', 'Vitamin A', 'Vitamin C', 'Vitamin B'],
    correct: 'Vitamin C',
  },
  {
    id: 3,
    question: 'What does BMI stand for?',
    options: ['Body Mass Index', 'Basic Medical Info', 'Body Metabolic Index', 'Basal Mineral Index'],
    correct: 'Body Mass Index',
  },
  {
    id: 4,
    question: 'How many grams of protein should adults consume daily?',
    options: ['0.8g per kg body weight', '2g per kg body weight', '5g per kg body weight', '10g per kg body weight'],
    correct: '0.8g per kg body weight',
  },
  {
    id: 5,
    question: 'Which food is richest in omega-3 fatty acids?',
    options: ['Salmon', 'Bread', 'Rice', 'Chicken'],
    correct: 'Salmon',
  },
];

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ResultModalProps {
  visible: boolean;
  score: number;
  total: number;
  onPress: () => void;
}

const ResultModal = ({ visible, score, total, onPress }: ResultModalProps) => (
  <Modal
    visible={visible}
    animationType="fade"
    transparent
    statusBarTranslucent
  >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <View
        style={{
          backgroundColor: "#1A1A1A",
          borderRadius: 24,
          padding: 32,
          alignItems: "center",
          width: "85%",
          borderWidth: 1,
          borderColor: "#333333",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 8,
          }}
        >
          🎉 Quiz Complete!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#999999",
            marginBottom: 24,
          }}
        >
          Great job completing the quiz
        </Text>

        <View
          style={{
            backgroundColor: "#0F0F0F",
            borderRadius: 16,
            padding: 20,
            width: "100%",
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#999999",
              marginBottom: 8,
            }}
          >
            Your Score
          </Text>
          <Text
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#FF6B6B",
            }}
          >
            {score}/{total}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#999999",
              marginTop: 8,
            }}
          >
            {Math.round((score / total) * 100)}% Correct
          </Text>
        </View>

        <Pressable
          onPress={onPress}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
          style={{
            backgroundColor: "#FF6B6B",
            paddingVertical: 16,
            borderRadius: 14,
            width: "100%",
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

interface QuizScreenProps {
  navigation: NativeStackNavigationProp<any>;
  onFinish: () => void;
}

export default function QuizScreen({ navigation, onFinish }: QuizScreenProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const current = MCQ_QUESTIONS[index];

  const handleNext = async () => {
    if (!selected) return;

    // Check if answer is correct
    if (selected === current.correct) {
      setScore(score + 1);
    }

    if (index < MCQ_QUESTIONS.length - 1) {
      setIndex(index + 1);
      setSelected("");
    } else {
      // Show Results
      setShowResult(true);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      if (auth.currentUser) {
        await AsyncStorage.setItem(`quizDone_${auth.currentUser.uid}`, "true");
      }
      setLoading(false);
      onFinish();
    } catch (error) {
      console.error("Error saving quiz status:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#0F0F0F" }}
      >
        <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
          {/* Progress Bar */}
          <View
            style={{
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#E0E0E0",
                }}
              >
                Question {index + 1}/{MCQ_QUESTIONS.length}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#999999",
                }}
              >
                Score: {score}
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: "#333333",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${((index + 1) / MCQ_QUESTIONS.length) * 100}%`,
                  backgroundColor: "#FF6B6B",
                }}
              />
            </View>
          </View>

          {/* Card Container */}
          <View
            style={{
              backgroundColor: "#1A1A1A",
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "#333333",
            }}
          >
            {/* Question */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#FFFFFF",
                marginBottom: 24,
                lineHeight: 28,
              }}
            >
              {current.question}
            </Text>

            {/* Options */}
            <View style={{ gap: 12 }}>
              {current.options.map((opt) => (
                <Pressable
                  key={opt}
                  onPress={() => setSelected(opt)}
                  android_ripple={{
                    color:
                      selected === opt
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 107, 107, 0.1)",
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor:
                      selected === opt ? "#FF6B6B" : "#333333",
                    backgroundColor:
                      selected === opt ? "#3A1A1A" : "#0F0F0F",
                    padding: 16,
                    borderRadius: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color:
                        selected === opt ? "#FF6B6B" : "#E0E0E0",
                    }}
                  >
                    {opt}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Next Button */}
          <Pressable
            onPress={handleNext}
            disabled={!selected}
            android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
            style={{
              backgroundColor:
                !selected ? "#666666" : "#FF6B6B",
              paddingVertical: 16,
              borderRadius: 14,
              marginBottom: 12,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {index === MCQ_QUESTIONS.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Text>
          </Pressable>

          {/* Skip Info Text */}
          {!selected && (
            <Text
              style={{
                color: "#666666",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Please select an answer to continue
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Result Modal */}
      <ResultModal
        visible={showResult}
        score={score}
        total={MCQ_QUESTIONS.length}
        onPress={handleContinue}
      />

      {/* Loading Modal */}
      {loading && (
        <Modal transparent statusBarTranslucent>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          >
            <ActivityIndicator size="large" color="#FF6B6B" />
          </View>
        </Modal>
      )}
    </SafeAreaProvider>
  );
}