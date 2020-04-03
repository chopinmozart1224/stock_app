import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { ColorPicker } from "react-native-color-picker";
import Theme from "../theme";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { openPicker: false };
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected = type => {
    const { rowData, onItemSelected } = this.props;
    onItemSelected(type, rowData);
  };

  render() {
    const { rowData, index } = this.props;

    return (
      <View>
        <View style={styles.itemContainer}>
          <View style={styles.colorCol}>
            <TouchableWithoutFeedback
              onPress={() => this.onItemSelected("openColorPicker")}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: rowData.color
                }}
              ></View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.itemCol}>
            <Text>{rowData.name}</Text>
          </View>
          <View style={styles.itemCol}>
            <Text>{rowData.number}</Text>
          </View>
          <View style={styles.itemCol}>
            <Text>${rowData.price}</Text>
          </View>
          <View style={styles.itemCol}>
            <Text>${Math.round(rowData.price * rowData.number)}</Text>
          </View>
          <View style={styles.tradeCol}>
            <TouchableWithoutFeedback
              onPress={() => this.onItemSelected("deleteSelectedData")}
            >
              <View style={styles.sellButton}>
                <Text alignment="center">Sell</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  colorCol: {
    flex: 0.15
  },
  itemCol: {
    flex: 0.2
  },
  tradeCol: {
    alignItems: "flex-end",
    flex: 0.1
  },
  sellButton: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 8,
    opacity: 0.7
  }
};

export default ListItem;
