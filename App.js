// @flow
"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import AreaSpline from "./js/charts/AreaSpline";
import Pie from "./js/charts/Pie";
import InputComp from "./js/charts/InputComp";
import List from "./js/charts/List";
import Theme from "./js/theme";
import _ from "lodash";

type State = {
  activeIndex: number,
  spendingsPerYear: any
};

const data = [
  // { name: "AAPL", number: 80, price: 242, color: "#1f77b4" },
  // { name: "GOOG", number: 100, price: 1107.8, color: "#ff7f0e" },
  // { name: "AMZN", number: 150, price: 1988.2, color: "#2ca02c" },
  { name: "TSLA", number: 200, price: 521.3, color: "#d62728" },
  { name: "MSFT", number: 300, price: 99.9, color: "#9467bd" },
  { name: "UBER", number: 300, price: 1000.5, color: "#8c564b" }
];

export default class App extends Component {
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      selectedItem: null,
      inputValues: { name: "", number: 0 },
      myPortfolio: data,
      openColorPicker: false
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addData = this.addData.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.onSelectColor = this.onSelectColor.bind(this);
  }

  _onPieItemSelected(newIndex) {
    this.setState({
      ...this.state,
      activeIndex: newIndex
    });
  }

  onInputChange(name, value) {
    const { inputValues } = this.state;
    const newInputValues = { ...inputValues, [name]: value };
    this.setState({ ...this.state, inputValues: newInputValues });
  }

  addData() {
    const { inputValues } = this.state;
    const { name, number } = inputValues;
    if (name && number !== 0) {
      let color = Theme.colors[Math.floor(Math.random() * 9) + 1];
      let newInputValues = { ...inputValues, price: 100, color };
      let newPortfolio = [...this.state.myPortfolio, newInputValues];
      this.setState({
        myPortfolio: newPortfolio,
        inputValues: { name: "", number: 0 }
      });
    }
  }

  deleteData() {}

  getSum(data) {
    let sum = 0;
    data.map(item => {
      sum += Number(item.number);
    });
    return sum;
  }

  onItemSelected(item) {
    this.setState({
      ...this.state,
      selectedItem: item,
      openColorPicker: !this.state.openColorPicker
    });
  }

  onSelectColor(selectedColor) {
    const { selectedItem, myPortfolio } = this.state;
    let newMyPortfolio = [...myPortfolio];
    let index = _.findIndex(myPortfolio, { name: selectedItem.name });
    newMyPortfolio.splice(index, 1, { ...selectedItem, color: selectedColor });
    this.setState({ myPortfolio: newMyPortfolio });
  }

  closeColorPicker() {
    this.setState({
      ...this.state,
      openColorPicker: !this.state.openColorPicker
    });
  }

  render() {
    const { myPortfolio, openColorPicker } = this.state;
    const height = 250;
    const width = 500;

    return (
      <View style={styles.container}>
        <Text style={styles.chart_title}>投資組合</Text>
        <View style={styles.pie}>
          <Pie
            pieWidth={200}
            pieHeight={200}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={myPortfolio}
            sum={this.getSum(myPortfolio)}
          />
        </View>
        <View style={styles.inputComp}>
          <InputComp
            inputValues={this.state.inputValues}
            onInputChange={this.onInputChange}
            onAddClick={this.addData}
          />
        </View>
        {openColorPicker ? (
          <View style={styles.colorPicker}>
            <View style={styles.colorPickerTitle}>
              <Text>Select colors:</Text>
              <TouchableWithoutFeedback onPress={this.closeColorPicker}>
                <View style={styles.closeButton}>
                  <Text>close</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.colorPickerList}>
              {Theme.colors.map((color, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => this.onSelectColor(color)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: color,
                        margin: 5
                      }}
                    ></View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>
        ) : null}

        <View style={styles.list}>
          <List data={myPortfolio} onItemSelected={this.onItemSelected} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "whitesmoke",
    marginTop: 21,
    flex: 1
  },
  pie: {
    flex: 0.25
  },
  inputComp: {
    flex: 0.05
  },
  list: {
    flex: 0.3
  },
  chart_title: {
    paddingTop: 15,
    textAlign: "center",
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: "white",
    color: "grey",
    fontWeight: "bold"
  },
  colorPicker: {
    padding: 5,
    margin: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5
  },
  colorPickerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  colorPickerList: { alignItems: "center", flexDirection: "row" },
  colorItem: {},
  closeButton: {
    padding: 5,
    backgroundColor: "grey",
    borderRadius: 8
  }
};
