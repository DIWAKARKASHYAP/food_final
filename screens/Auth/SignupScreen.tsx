import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
    import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SignupScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

interface Errors {
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  submit?: string | null;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validateInputs = () => {
    const newErrors: Errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signup = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      setErrors({ submit: err.message });
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          style={{ backgroundColor: "#0F0F0F" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
            {/* Header */}
            <View style={{ marginBottom: 48 }}>
              <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: 12
              }}>
                Create Account
              </Text>
              <Text style={{
                fontSize: 16,
                color: "#999999",
                textAlign: "center"
              }}>
                Join us to get started
              </Text>
            </View>

            {/* Card Container */}
            <View style={{
              backgroundColor: "#1A1A1A",
              borderRadius: 20,
              padding: 24,
              marginBottom: 32,
              borderWidth: 1,
              borderColor: "#333333",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.5,
              shadowRadius: 40,
              elevation: 10
            }}>
              {/* Email Input */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{
                  color: "#E0E0E0",
                  fontWeight: "600",
                  marginBottom: 12,
                  fontSize: 16
                }}>
                  Email
                </Text>
                <TextInput
                  placeholder="you@example.com"
                  placeholderTextColor="#666666"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  editable={!loading}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    borderWidth: 2,
                    borderColor: errors.email ? "#FF6B6B" : "#333333",
                    backgroundColor: "#0F0F0F",
                    padding: 16,
                    borderRadius: 14,
                    fontSize: 16,
                    fontFamily: "System",
                    color: "#FFFFFF",
                  }}
                />
                {errors.email && (
                  <Text style={{
                    color: "#FF6B6B",
                    fontSize: 14,
                    marginTop: 8
                  }}>
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{
                  color: "#E0E0E0",
                  fontWeight: "600",
                  marginBottom: 12,
                  fontSize: 16
                }}>
                  Password
                </Text>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#666666"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  secureTextEntry
                  editable={!loading}
                  style={{
                    borderWidth: 2,
                    borderColor: errors.password ? "#FF6B6B" : "#333333",
                    backgroundColor: "#0F0F0F",
                    padding: 16,
                    borderRadius: 14,
                    fontSize: 16,
                    fontFamily: "System",
                    color: "#FFFFFF",
                  }}
                />
                {errors.password && (
                  <Text style={{
                    color: "#FF6B6B",
                    fontSize: 14,
                    marginTop: 8
                  }}>
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={{ marginBottom: 32 }}>
                <Text style={{
                  color: "#E0E0E0",
                  fontWeight: "600",
                  marginBottom: 12,
                  fontSize: 16
                }}>
                  Confirm Password
                </Text>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#666666"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                  }}
                  secureTextEntry
                  editable={!loading}
                  style={{
                    borderWidth: 2,
                    borderColor: errors.confirmPassword ? "#FF6B6B" : "#333333",
                    backgroundColor: "#0F0F0F",
                    padding: 16,
                    borderRadius: 14,
                    fontSize: 16,
                    fontFamily: "System",
                    color: "#FFFFFF",
                  }}
                />
                {errors.confirmPassword && (
                  <Text style={{
                    color: "#FF6B6B",
                    fontSize: 14,
                    marginTop: 8
                  }}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              {/* Signup Button */}
              <Pressable
                onPress={signup}
                disabled={loading}
                android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
                style={{
                  backgroundColor: "#FF6B6B",
                  paddingVertical: 16,
                  borderRadius: 14,
                  marginBottom: 16,
                  elevation: 5,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                  {loading && <ActivityIndicator color="white" size="small" />}
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 16,
                      marginLeft: loading ? 8 : 0,
                    }}
                  >
                    {loading ? "Creating Account..." : "Sign Up"}
                  </Text>
                </View>
              </Pressable>

              {/* Login Link */}
              <Pressable
                onPress={() => navigation.goBack()}
                android_ripple={{ color: "rgba(255, 107, 107, 0.2)" }}
              >
                <Text style={{
                  color: "#FF6B6B",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600"
                }}>
                  Already have an account?
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}