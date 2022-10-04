import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../config/colors";
import Icon from "react-native-vector-icons/FontAwesome";

<Icon>star</Icon>;

function Input({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? Colors.red
              : isFocused
              ? Colors.darkBlue
              : Colors.light,
          },
        ]}
      >
        <Icon name={iconName} style={styles.icon} />
        <TextInput
          {...props}
          style={{ color: Colors.darkBlue, flex: 1 }}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          secureTextEntry={hidePassword}
        />
        {password && (
          <Icon
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
            name={hidePassword ? "eye" : "eye-slash"}
            style={{ fontSize: 22, color: Colors.darkBlue }}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: Colors.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: Colors.light,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: "center"
  },
  icon: {
    fontSize: 22,
    color: Colors.darkBlue,
    marginRight: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 7,
  },
});

export default Input;
