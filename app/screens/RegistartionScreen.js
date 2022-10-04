import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
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

function RegistartionScreen({ navigation }) {
  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false)

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
      valid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input name", "fullname");
      valid = false;

    }
    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      valid = false;

    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;

    }
    else if(inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      valid = false;

    }

    if(valid) {
        register()
    }
  };

  const register = () => {
    setloading(true)

    setTimeout( () => {
        setloading(false)

        try {
          AsyncStorage.setItem("user", JSON.stringify(inputs))
          navigation.navigate("LoginScreen")
            
        } catch (error) {
            Alert.alert("Error", 'something went wrong')
        }
    }, 3000)
  }

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
        <Text style={styles.titleHeader}>Register</Text>
        <Text style={styles.textHeader}>Enter Your Details to Register</Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Enter your full names"
            label="Full Name"
            iconName="user"
            error={errors.fullname}
            onFocus={() => {
              handleError(null, "fullname");
            }}
            onChangeText={(text) => handleOnChange(text, "fullname")}
          />
          <Input
            placeholder="Enter your phone number"
            label="Phone Number"
            iconName="phone"
            keyboardType="numeric"
            error={errors.phone}
            onFocus={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => handleOnChange(text, "phone")}
          />
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

          <Button title="Register" onPress={validate} />

          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.loginText}
          >
            Already have account ? Login
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

export default RegistartionScreen;
