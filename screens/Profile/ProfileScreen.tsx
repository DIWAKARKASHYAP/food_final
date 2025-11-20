import { View, Text, Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl mb-4">Profile</Text>

      <Pressable
        onPress={() => signOut(auth)}
        className="bg-red-600 py-3 px-6 rounded-xl"
      >
        <Text className="text-white font-bold">Logout</Text>
      </Pressable>
    </View>
  );
}
