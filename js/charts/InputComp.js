import React from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";

const InputComp = props => {
  const { inputValues, onInputChange, onAddClick } = props;
  const onChangeText = (name, text) => {
    onInputChange(name, text);
  };
  const onPress = () => {
    onAddClick();
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameInput}>
        <TextInput
          placeholder="Enter symbol"
          style={styles.textInput}
          onChangeText={text => onChangeText("name", text)}
          value={inputValues.name}
        />
      </View>
      <View style={styles.valueInput}>
        <TextInput
          placeholder="Enter shares"
          style={styles.textInput}
          onChangeText={text => onChangeText("number", text)}
          value={inputValues.number}
        />
      </View>
      <View style={styles.button}>
        <TouchableWithoutFeedback style={styles.button} onPress={onPress}>
          <View>
            <Text>Buy</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = {
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  nameInput: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
    margin: 6
  },
  valueInput: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
    margin: 6
  },
  textInput: {
    height: 35,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1,
    backgroundColor: "lightblue",
    margin: 6,
    borderRadius: 5,
    height: 35
  }
};

export default InputComp;
