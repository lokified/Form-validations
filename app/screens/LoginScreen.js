import React, {useState} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Keyboard,
  Alert,
} from "react-native";
import { Colors } from "../../config/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ navigation }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = () => {
    setloading(true);

    setTimeout(async () => {
      setloading(false);
      let userData = await AsyncStorage.getItem("user");

      if (userData) {
        userData = JSON.parse(userData);

        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem("user", JSON.stringify({...userData, loggedIn: true}))
          navigation.navigate('HomeScreen')
        } else {
          Alert.alert("Error", "Invalid details");
        }
      } else {
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView style={styles.scroll}>
        <Text style={styles.titleHeader}>Login</Text>
        <Text style={styles.textHeader}>Enter Your Details to Login</Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Enter your email address"
            label="email"
            iconName="envelope"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          <Input
            placeholder="Enter your password"
            label="password"
            iconName="lock"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
          />

          <Button title="Login" onPress={validate} />

          <Text
            onPress={() => navigation.navigate("RegistrationScreen")}
            style={styles.loginText}
          >
            Don't have an account ?Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scroll: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titleHeader: {
    color: Colors.black,
    fontSize: 40,
    fontWeight: "bold",
  },
  textHeader: {
    color: Colors.grey,
    fontSize: 18,
    marginVertical: 10,
  },
  loginText: {
    color: Colors.black,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
});

export default LoginScreen;
