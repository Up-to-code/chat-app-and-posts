// src/screens/SignUpScreen.tsx
import InputField from "@/components/common/InputFiled";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

const SignUpScreen = () => {
  const [FormData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const CreateAccount = () => {
    console.log(FormData);
  };
  return (
    <View className="flex-1 bg-white justify-center px-8">
      <SafeAreaView className="mt-6">
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <KeyboardAvoidingView>
            <View className="mt-6">
              <Text className="text-3xl font-bold  my-6">Sign Up</Text>
              <InputField
                label="First Name"
                value={FormData.firstName}
                onChange={(text) => {
                  setFormData({ ...FormData, firstName: text });
                }}
              />
              <InputField
                label="Last Name"
                value={FormData.lastName}
                onChange={(text) => {
                  setFormData({ ...FormData, lastName: text });
                }}
              />
              <InputField
                label="Email"
                value={FormData.email}
                onChange={(text) => {
                  setFormData({ ...FormData, email: text });
                }}
              />
              <InputField
                label="Password"
                value={FormData.password}
                onChange={(text) => {
                  setFormData({ ...FormData, password: text });
                }}
              />
              <InputField
                label="Confirm Password"
                value={FormData.confirmPassword}
                onChange={(text) => {
                  setFormData({ ...FormData, confirmPassword: text });
                }}
              />

              <TouchableOpacity
                className="bg-black p-4 rounded-lg"
                onPress={CreateAccount}
              >
                <Text className="text-white text-center">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            className="mt-4"
            onPress={() => {
              router.push("/Sign-in");
            }}
          >
            <Text className="text-center text-gray-500 my-5">
              Already have any account? Sign In
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;
