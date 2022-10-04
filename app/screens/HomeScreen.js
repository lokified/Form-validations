import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem("user");

    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );

    navigation.navigate('LoginScreen')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {userDetails?.fullname}</Text>

      <Button title="Log out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
