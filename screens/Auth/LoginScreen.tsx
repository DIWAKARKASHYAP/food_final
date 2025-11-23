import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
    import { SafeAreaProvider } from 'react-native-safe-area-context';
interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

interface Errors {
  email?: string | null;
  password?: string | null;
  submit?: string | null;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validateInputs = () => {
    const newErrors: Errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      setErrors({ submit: err.message });
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
            <SafeAreaProvider style={{ flex: 1, backgroundColor: "#0F0F0F" }}>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <View style={{ marginBottom: 40 }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "700",
              color: "white",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Welcome Back 👋
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#9CA3AF",
              textAlign: "center",
            }}
          >
            Sign in to continue your journey
          </Text>
        </View>

        {/* Form Card */}
        <View
          style={{
            backgroundColor: "#161616",
            padding: 28,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#2A2A2A",
            marginBottom: 32,
          }}
        >
          {/* Email */}
          <View style={{ marginBottom: 22 }}>
            <Text
              style={{
                color: "#E5E7EB",
                fontWeight: "600",
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1.5,
                borderColor: errors.email ? "#EF4444" : "#3F3F46",
                backgroundColor: "#0D0D0D",
                padding: 16,
                borderRadius: 14,
                fontSize: 16,
                color: "white",
              }}
            />
            {errors.email && (
              <Text style={{ color: "#EF4444", fontSize: 13, marginTop: 6 }}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password */}
          <View style={{ marginBottom: 28 }}>
            <Text
              style={{
                color: "#E5E7EB",
                fontWeight: "600",
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              secureTextEntry
              editable={!loading}
              style={{
                borderWidth: 1.5,
                borderColor: errors.password ? "#EF4444" : "#3F3F46",
                backgroundColor: "#0D0D0D",
                padding: 16,
                borderRadius: 14,
                fontSize: 16,
                color: "white",
              }}
            />
            {errors.password && (
              <Text style={{ color: "#EF4444", fontSize: 13, marginTop: 6 }}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Login Button */}
          <Pressable
            onPress={login}
            disabled={loading}
            android_ripple={{ color: "rgba(255,255,255,0.15)" }}
            style={{
              backgroundColor: loading ? "#2563EB" : "#3B82F6",
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 17,
                }}
              >
                Sign In
              </Text>
            )}
          </Pressable>

          {/* Forgot Password */}
          {/* <Pressable style={{ marginTop: 16 }}>
            <Text
              style={{
                color: "#60A5FA",
                textAlign: "center",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Forgot password?
            </Text>
          </Pressable> */}
        </View>

        {/* Signup CTA */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#9CA3AF", fontSize: 15 }}>
            New here?
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                color: "#60A5FA",
                fontWeight: "600",
                fontSize: 15,
                marginLeft: 6,
              }}
            >
              Create account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
            </SafeAreaProvider>

);
}
