import React from "react";
import { View, Text, ListView } from "react-native";
import ListItem from "./ListItem";

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const List = props => {
  const { data } = props;
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
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
      </View>
      <ListView
        dataSource={ds.cloneWithRows(data)}
        renderRow={rowData => <ListItem rowData={rowData} />}
      />
    </View>
  );
};

const styles = {
  container: {},
  tableHeader: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
    flexDirection: "row"
  },
  tableHead: {
    flex: 0.2
  },
  textInput: {}
};

export default List;
