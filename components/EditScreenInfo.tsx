import React from "react";
import { Text, View } from "react-native";

interface EditScreenInfoProps {
  path: string;
}

export const EditScreenInfo = ({ path }: EditScreenInfoProps) => {
  const title = "Open up the code for this screen:";
  const description =
    "Change any of the text, save the file, and your app will automatically update.";

  return (
    <View>
      <View className="items-center mx-12">
        <Text className="text-lg leading-6 text-center font-semibold text-white mb-2">
          {title}
        </Text>

        <View className="rounded-md px-2 py-1 bg-zinc-800 my-2">
          <Text className="text-white font-mono">{path}</Text>
        </View>

        <Text className="text-lg leading-6 text-center text-zinc-300 mt-2">
          {description}
        </Text>
      </View>
    </View>
  );
};
