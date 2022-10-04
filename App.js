import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "./app/screens/RegistartionScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./app/components/Loader";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    setTimeout(authUser, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("user");

      if (userData) {
        userData = JSON.parse(userData);

        if (userData?.loggedIn) {
          setInitialRouteName("HomeScreen");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("RegistrationScreen");
      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen");
    }
  };

  return (
    <NavigationContainer>
      {initialRouteName == "" ? (
        <Loader visible={true} />
      ) : (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
