import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  showLabel?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  showLabel,
  className,
}: InputFieldProps) {
  return (
    <View>
      {showLabel && <Text className="text-lg font-bold mb-2">{label}</Text>}
      <TextInput
        className={`border border-gray-300 p-4 rounded-lg mb-4 text-lg ${className}`}
        secureTextEntry={label === "Password"}
        placeholder={label}
        defaultValue={value}
        onChangeText={onChange}
      />
    </View>
  );
}
