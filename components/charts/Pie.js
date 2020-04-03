import React from "react";
import { StyleSheet, View, ART, TouchableWithoutFeedback } from "react-native";

const { Surface, Group, Shape, Path, Text } = ART;

import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as line from "d3-line";
import Theme from "../theme";

const d3 = {
  scale,
  shape,
  line
};

import { scaleBand, scaleLinear } from "d3-scale";

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this.createPieChart = this.createPieChart.bind(this);
    this._value = this._value.bind(this);
  }

  _value(item) {
    return item.number;
  }

  createPieChart(index) {
    const { pieWidth } = this.props;
    var arcs = d3.shape.pie().value(this._value)(this.props.data);

    var arc = d3.shape
      .arc()
      .outerRadius(pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(40);

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
    const { sum } = this.props;
    let percentage = Math.round((number / sum) * 1000) / 10;
    return percentage.toString() + "%";
  }

  render() {
    const { stockValue } = this.props;
    const x = this.props.pieWidth;
    const y = this.props.pieHeight / 1.5;

    return (
      <View width={this.props.width} height={this.props.height}>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={x} y={y}>
            {this.props.data.map((item, index) => (
              <Shape
                key={index}
                d={this.createPieChart(index)}
                stroke={item.color}
                strokeWidth={0.5}
                fill={item.color}
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
              y={-10}
              font={`12px "Helvetica Neue", "Helvetica", Arial`}
              fill="#000000"
              alignment="center"
            >
              Total value:{stockValue}
            </Text>
          </Group>
        </Surface>
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
  },
  toggle: {
    width: 50,
    height: 50
  }
};

export default Pie;
