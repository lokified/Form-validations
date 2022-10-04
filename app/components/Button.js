import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "../../config/colors";

function Button({ title, onPress = () => {} }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    width: "100%",
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Button;
