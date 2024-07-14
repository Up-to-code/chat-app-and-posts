import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { FIREBASE_AUTH } from "@/lib/firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";
import { createUserDoc } from "@/lib/firebase/FirebaseServes";
import InputField from "@/components/common/InputFiled";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const auth = FIREBASE_AUTH;
  const [type, setType] = useState("Sign in");
  const signIn = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(app)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
    setLoading(false);
  };

  const signUp = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      alert("Please enter email, password and name");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      await createUserDoc(email, user.user.uid, name);

      if (user) router.replace("/(app)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white justify-center px-8"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={1}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {/* <Image style={styles.logo} source={require('../assets/images/logo-white.png')} /> */}

      <Text className="text-3xl font-bold my-4">
        {type === "login" ? "Welcome back" : "Create your account"}
      </Text>

      <View style={{ marginBottom: 20 }}>
        {type === "login" ? (
          <></>
        ) : (
          <>
            <InputField
              label="Name"
              value={name}
              onChange={(text) => {
                setName(text);
              }}
            />
          </>
        )}

        <InputField
          label="Email"
          value={email}
          onChange={(text) => {
            setEmail(text);
          }}
        />

        <InputField
          label="Password"
          value={password}
          onChange={(text) => {
            setPassword(text);
          }}
        />
      </View>

      {type === "login" ? (
        <TouchableOpacity
          onPress={signIn}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={signUp}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Create acount</Text>
        </TouchableOpacity>
      )}

      <View className="flex-row justify-center items-center">
        <Text className=" text-center my-4 text-gray-500 font-bold ">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
        </Text>
        <TouchableOpacity
          onPress={() => setType(type === "login" ? "Sign up" : "login")}
        >
          <Text className="text-blue-500 font-bold ">
            {type === "login" ? "Sign up" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginVertical: 80,
  },

  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  btnPrimary: {
    backgroundColor: "#007bff",
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Page;
