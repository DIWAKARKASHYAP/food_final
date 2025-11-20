import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, SafeAreaView, Modal, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const ResultModal = ({ visible, score, total, onPress }) => (
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
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: 32,
          alignItems: "center",
          width: "85%",
          borderWidth: 1,
          borderColor: "#334155",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#F1F5F9",
            marginBottom: 8,
          }}
        >
          🎉 Quiz Complete!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#94A3B8",
            marginBottom: 24,
          }}
        >
          Great job completing the quiz
        </Text>

        <View
          style={{
            backgroundColor: "#0F172A",
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
              color: "#94A3B8",
              marginBottom: 8,
            }}
          >
            Your Score
          </Text>
          <Text
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#10B981",
            }}
          >
            {score}/{total}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#94A3B8",
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
            backgroundColor: "#10B981",
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

export default function QuizScreen({ navigation }) {
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
      await AsyncStorage.setItem("quizDone", "true");
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }],
      });
    } catch (error) {
      console.error("Error saving quiz status:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#0F172A" }}
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
                  color: "#E2E8F0",
                }}
              >
                Question {index + 1}/{MCQ_QUESTIONS.length}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#94A3B8",
                }}
              >
                Score: {score}
              </Text>
            </View>
            <View
              style={{
                height: 6,
                backgroundColor: "#334155",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${((index + 1) / MCQ_QUESTIONS.length) * 100}%`,
                  backgroundColor: "#3B82F6",
                }}
              />
            </View>
          </View>

          {/* Card Container */}
          <View
            style={{
              backgroundColor: "#1E293B",
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "#334155",
            }}
          >
            {/* Question */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#F1F5F9",
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
                        : "rgba(59, 130, 246, 0.1)",
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor:
                      selected === opt ? "#3B82F6" : "#475569",
                    backgroundColor:
                      selected === opt ? "#1F3A5F" : "#0F172A",
                    padding: 16,
                    borderRadius: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color:
                        selected === opt ? "#3B82F6" : "#E2E8F0",
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
                !selected ? "#94A3B8" : "#10B981",
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
                color: "#64748B",
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
            <ActivityIndicator size="large" color="#10B981" />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}