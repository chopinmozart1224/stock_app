// @flow
"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from "react-native";
import AreaSpline from "./js/charts/AreaSpline";
import Pie from "./js/charts/Pie";
import InputComp from "./js/charts/InputComp";
import List from "./js/charts/List";
import Theme from "./js/theme";
// import data from "./resources/data";

type State = {
  activeIndex: number,
  spendingsPerYear: any
};

const data = [
  { number: 10, name: "AAPL", price: 242 },
  { number: 12, name: "GOOG", price: 1107 },
  { number: 2, name: "AMZN", price: 2000 },
  { number: 2, name: "TSLA", price: 500 },
  { number: 2, name: "MSFT", price: 100 },
  { number: 4, name: "UBER", price: 1000 }
];

export default class App extends Component {
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      inputValues: { name: "", number: 0 },
      myPortfolio: data
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addData = this.addData.bind(this);
  }

  _onPieItemSelected(newIndex) {
    this.setState({
      ...this.state,
      activeIndex: newIndex,
      spendingsPerYear: this._shuffle(data.spendingsPerYear)
    });
  }

  _shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  onInputChange(name, value) {
    const { inputValues } = this.state;
    const newInputValues = { ...inputValues, [name]: value };
    this.setState({ ...this.state, inputValues: newInputValues });
  }

  addData() {
    console.log("hello click", this.state);
    const { inputValues } = this.state;
    const { name, number } = inputValues;
    if (name && number !== 0) {
      let newInputValues = { ...inputValues, price: 100 };
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
    console.log("sum", sum);
    return sum;
  }

  render() {
    const { myPortfolio } = this.state;
    const height = 250;
    const width = 500;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.chart_title}>投資組合</Text>
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
          <InputComp
            inputValues={this.state.inputValues}
            onInputChange={this.onInputChange}
            onAddClick={this.addData}
          />
          <List data={myPortfolio} />

          {/* <AreaSpline
            width={width}
            height={height}
            data={this.state.spendingsPerYear}
            color={Theme.colors[this.state.activeIndex]} /> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "whitesmoke",
    marginTop: 21
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
  }
};
