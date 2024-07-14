import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  className,
}: InputFieldProps) {
  return (
    <View>
      <Text className="text-lg font-bold mb-2">{label}</Text>
      <TextInput
        className={`border border-gray-300 p-4 rounded-lg mb-4 text-lg ${className}`}
        placeholder={label}
        defaultValue={value}
        onChangeText={onChange}
      />
    </View>
  );
}
