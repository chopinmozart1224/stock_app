import React from "react";
import { View, Text, ListView } from "react-native";
import ListItem from "./ListItem";
import { ColorPicker } from "react-native-color-picker";

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const List = props => {
  const { data, onItemSelected } = props;
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <View style={styles.colorCol}>
          <Text>Color</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Symbol</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Quantity</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Last</Text>
        </View>
        <View style={styles.tableHead}>
          <Text>Market value</Text>
        </View>
        <View style={styles.tradeHead}>
          <Text>trade</Text>
        </View>
      </View>
      <ListView
        dataSource={ds.cloneWithRows(data)}
        renderRow={(rowData, index) => (
          <ListItem rowData={rowData} onItemSelected={onItemSelected} />
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1
  },
  colorCol: {
    flex: 0.15
  },
  tableHeader: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.15,
    flexDirection: "row"
  },
  tableHead: {
    flex: 0.2
  },
  tradeHead: { flex: 0.1 }
};

export default List;
