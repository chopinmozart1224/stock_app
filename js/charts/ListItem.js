import React from "react";
import { View, Text } from "react-native";

const ListItem = props => {
  const { rowData } = props;

  return (
    <View style={styles.itemContainer}>
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
        <Text>${rowData.price * rowData.number}</Text>
      </View>
    </View>
  );
};

const styles = {
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  itemCol: {
    flex: 0.2
  }
};

export default ListItem;
