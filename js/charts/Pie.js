// @flow
"use strict";

import React from "react";
import {
  StyleSheet,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

const { Surface, Group, Rectangle, Shape, Path, ClippingRectangle, Text } = ART;

import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as line from "d3-line";
import * as d3Array from "d3-array";
import AnimShape from "../art/AnimShape";
import Theme from "../theme";

const d3 = {
  scale,
  shape,
  line
};

import { scaleBand, scaleLinear } from "d3-scale";

type Props = {
  height: number,
  width: number,
  pieWidth: number,
  pieHeight: number,
  colors: any,
  onItemSelected: any
};

type State = {
  highlightedIndex: number
};

class Pie extends React.Component {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { highlightedIndex: 0, sum: this.getSum(props.data) };
    this._createPieChart = this._createPieChart.bind(this);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }

  getSum(data) {
    console.log("hi data", data);
    let sum = 0;
    data.map(item => {
      sum += item.number;
    });
    return sum;
  }

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  _value(item) {
    return item.number;
  }

  _label(item) {
    return item.name;
  }

  _color(index) {
    return Theme.colors[index];
  }

  // _createPieChart(index) {
  //   var arcs = d3.shape.pie().value(this._value)(this.props.data);
  //
  //   var hightlightedArc = d3.shape
  //     .arc()
  //     .outerRadius(this.props.pieWidth / 2 + 10)
  //     .padAngle(0.05)
  //     .innerRadius(30);
  //
  //   var arc = d3.shape
  //     .arc()
  //     .outerRadius(this.props.pieWidth / 2)
  //     .padAngle(0.05)
  //     .innerRadius(30);
  //
  //   var arcData = arcs[index];
  //   var path =
  //     this.state.highlightedIndex == index
  //       ? hightlightedArc(arcData)
  //       : arc(arcData);
  //
  //   return {
  //     path,
  //     color: this._color(index)
  //   };
  // }

  _createPieChart(index) {
    const { pieWidth } = this.props;
    var arcs = d3.shape.pie().value(this._value)(this.props.data);

    var arc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(35);

    let outerArc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .innerRadius(35);

    var arcData = arcs[index];
    var path = arc(arcData);

    return path;
  }

  getPaths = index => {
    const { pieWidth } = this.props;
    var arcs = d3.shape.pie().value(this._value)(this.props.data);

    var arc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(35);

    let outerArc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .innerRadius(35);

    var arcData = arcs[index];

    const { startAngle, endAngle } = arcData;
    var posA = arc.centroid(arcData);
    var posB = outerArc.centroid(arcData);
    var posC = outerArc.centroid(arcData);
    var midangle =
      arcData.startAngle + (arcData.endAngle - arcData.startAngle) / 2;
    posC[0] = 1.1 * (pieWidth / 2) * (midangle < Math.PI ? 1 : -1);
    posB[0] = Math.sign(posC[0]) === 1 ? posB[0] + 10 : posB[0] - 10;

    const linePath = `M ${posA[0]} ${posA[1]} L ${posB[0]} ${posB[1] - 10} L ${
      posC[0]
    } ${posC[1] - 10}`;

    return linePath;
  };

  getLablePos(index, name) {
    const { pieWidth } = this.props;
    var arcs = d3.shape.pie().value(this._value)(this.props.data);

    var arc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(35);

    let outerArc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .innerRadius(35);

    var arcData = arcs[index];

    var pos = outerArc.centroid(arcData);
    var midangle =
      arcData.startAngle + (arcData.endAngle - arcData.startAngle) / 2;
    pos[0] = (pieWidth / 1.5) * 0.99 * (midangle < Math.PI ? 1 : -1);
    pos[1] -= 18;

    return name === "x" ? pos[0] : pos[1];
  }

  getValuePos(index, name) {
    const { pieWidth } = this.props;
    var arcs = d3.shape.pie().value(this._value)(this.props.data);

    var arc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(35);

    let outerArc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .innerRadius(35);

    var arcData = arcs[index];

    var pos = outerArc.centroid(arcData);
    var midangle =
      arcData.startAngle + (arcData.endAngle - arcData.startAngle) / 2;

    return name === "x" ? pos[0] : pos[1];
  }

  getValues(number) {
    const { sum } = this.state;
    let percentage = Math.round((number / sum) * 1000) / 10;
    return percentage.toString() + "%";
  }

  _onPieItemSelected(index) {
    this.setState({ ...this.state, highlightedIndex: index });
    this.props.onItemSelected(index);
  }

  render() {
    // const margin = styles.container.margin;
    const x = this.props.pieWidth;
    const y = this.props.pieHeight;

    return (
      <View width={this.props.width} height={this.props.height}>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            {this.props.data.map((item, index) => (
              <Shape
                key={index}
                d={this._createPieChart(index)}
                stroke={this._color(index)}
                strokeWidth={0.5}
                fill={this._color(index)}
              />
            ))}
            {this.props.data.map((item, index) => (
              <Shape
                key={index}
                d={this.getPaths(index, item)}
                stroke="black"
                strokeWidth={1}
              />
            ))}
            {this.props.data.map((item, index) => (
              <Text
                key={index}
                x={this.getLablePos(index, "x")}
                y={this.getLablePos(index, "y")}
                font={`13px "Helvetica Neue", "Helvetica", Arial`}
                fill="#000000"
                alignment="center"
              >
                {item.name}
              </Text>
            ))}
            {this.props.data.map((item, index) => {
              return (
                <Text
                  key={index}
                  x={this.getValuePos(index, "x")}
                  y={this.getValuePos(index, "y")}
                  font={`12px "Helvetica Neue", "Helvetica", Arial`}
                  fill="#000000"
                  alignment="center"
                >
                  {this.getValues(item.number)}
                </Text>
              );
            })}
            <Text
              x={0}
              y={0}
              font={`12px "Helvetica Neue", "Helvetica", Arial`}
              fill="#000000"
              alignment="center"
            >
              9999100$
            </Text>
          </Group>
        </Surface>

        {/* <View
          style={{
            position: "absolute",
            top: margin,
            left: 2 * margin + this.props.pieWidth
          }}
        >
          {this.props.data.map((item, index) => {
            var fontWeight =
              this.state.highlightedIndex == index ? "bold" : "normal";
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this._onPieItemSelected(index)}
              >
                <View>
                  <Text
                    style={[
                      styles.label,
                      { color: this._color(index), fontWeight: fontWeight }
                    ]}
                  >
                    {this._label(item)}: {this._value(item)}%
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View> */}
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 0
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "normal"
  }
};

export default Pie;
