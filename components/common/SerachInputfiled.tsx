import { useColors } from "@/hooks/useColors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  showLabel?: boolean;
  onKeyPress?: () => void;
  onPresslabel?: () => void;
}

export default function SearchInputField({
  label,
  value,
  onChange,
  showLabel,
  className,
  onKeyPress,
  onPresslabel,
}: InputFieldProps) {
  const { primary } = useColors();
  const InputRef = useRef<TextInput>(null);
  return (
    <View className="relative" style={styles.container}>
      {showLabel && <Text className="text-lg font-bold mb-2">{label}</Text>}
      <TextInput
        className={`border-b border-gray-300 p-4 rounded-lg mb-4 text-lg ${className}`}
        placeholder={label}
        defaultValue={value}
        onChangeText={onChange}
        ref={InputRef}
        keyboardType="email-address"
        onBlur={() => {
          onKeyPress && onKeyPress();
        }}
      />
      <TouchableOpacity
        style={[styles.icon]}
        activeOpacity={0.7}
        onPress={() => onPresslabel?.()}
      >
        <FontAwesome5 name="search" size={24} color={primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 13,
    top: 13,
  },
});
