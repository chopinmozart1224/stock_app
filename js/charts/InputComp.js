import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const InputComp = () => {
  const [state, setState] = useState({
    value: ""
  });
  const onChangeText = text => {
    console.log("input", text);
  };
  return (
    <View style={styles.container}>
      <Text>InputComp</Text>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => onChangeText(text)}
          value={state.value}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default InputComp;
