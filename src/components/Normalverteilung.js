import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Bar,
} from "recharts";

const Normalverteilung = (props) => {
  const yoffest = 2;
  const minX = Math.round(props.untereToleranz) - yoffest;
  const maxX = Math.round(props.obereToleranz) + yoffest;

  function FindAverage(array) {
    var sum = 0;
    for (let index = 0; index < array.length; index++) {
      sum += parseFloat(array[index].text);
    }
    var avg = sum / array.length;
    return avg;
  }

  function FindStandarddeviation(array) {
    // var sum = 0;
    // for (let index = 0; index < array.length; index++) {
    //   debugger;
    //   sum += parseFloat(array[index].text);
    //   debugger;
    // }
    // debugger;
    var avg = FindAverage(array);

    // var avg = sum / array.length;
    if (avg) {
      var varianz = 0;
      for (let index = 0; index < array.length; index++) {
        varianz += Math.pow(parseFloat(array[index].text) - avg, 2);
      }

      var standardanweichung = Math.sqrt(varianz / (array.length - 1));
      return standardanweichung;
    }
  }

  //   function Findcp(array) {
  //     var sum = 0;
  //     for (let index = 0; index < array.length; index++) {
  //       sum += parseFloat(array[index].text);
  //     }
  //     var avg = sum / array.length;
  //     if (avg) {
  //       var varianz = 0;
  //       for (let index = 0; index < array.length; index++) {
  //         varianz += Math.pow(parseFloat(array[index].text) - avg, 2);
  //       }

  //       var standardanweichung = Math.sqrt(varianz / (array.length - 1));
  //       if (standardanweichung) {
  //         var cp =
  //           (props.obereToleranz - props.untereToleranz) /
  //           (6 * standardanweichung);
  //       }
  //       return cp;
  //     }
  //   }
  debugger;
  function FindZTrans(array) {
    var avg = 0;
    avg = FindAverage(array);
    var s = 0;
    s = FindStandarddeviation(array);
    var zi = 0;
    debugger;
    let arrayzi = [];
    if (avg && s) {
      debugger;
      for (let index = 0; index < array.length; index++) {
        zi = (parseFloat(array[index].text) - avg) / s;
        arrayzi.push(zi);
        debugger;
      }

      return arrayzi;
    }
  }

  debugger;
  function Findnormaldistribution(array) {
    var normaldistribution = [];
    debugger;
    var ziList = FindZTrans(array);
    if (ziList) {
      for (let index = 0; index < ziList.length; index++) {
        debugger;
        var ndconst = 1 / Math.sqrt(2 * Math.PI);
        var ndcalc = 0;
        debugger;
        ndcalc += Math.exp(-(Math.pow(ziList[index], 2) / 2));
        var nd = ndconst * ndcalc;
        debugger;
        normaldistribution.push(nd);
        debugger;
      }
    }
    return normaldistribution;
  }

  return (
    <ResponsiveContainer minWidth="400" height={400}>
      <ComposedChart
        width={600}
        height={300}
        data={Findnormaldistribution(props.messwertlist)}
        margin={{
          top: 10,
          right: 30,
          left: 30,
          bottom: 20,
        }}
      >
        <Line
          type="monotone"
          dataKey="text"
          stroke="#2196F3"
          strokeWidth={3}
          // activeDot={{ r: 8 }}
          //   dot={<CustomizedDot />}
        />
        <Bar dataKey="pv" barSize={props.messwertlist} fill="#413ea0" />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/> */}
        <XAxis></XAxis>
        <YAxis
          domain={[minX, maxX]}
          tickCount={25}
          label={{
            value: `Messwerte [mm]`,
            style: { textAnchor: "middle" },
            angle: -90,
            position: "left",
            offset: 0,
          }}
        />
        {/* <YAxis
          domain={[minX, maxX]}
          tickCount={25}
          label={{
            value: `Messwerte [mm]`,
            style: { textAnchor: "middle" },
            angle: -90,
            position: "left",
            offset: 0,
          }}
        /> */}
        {/* <YAxis
          yAxisId="right"
          orientation="right"
          dataKey="text"
          domain={[minX, maxX]}
        /> */}
        {/* <ReferenceLine
          y={props.obereToleranz}
          label={{
            value: `OSG`,
            style: { textAnchor: "middle" },
            angle: -90,
            position: "right",
            offset: 35,
          }}
          stroke="red"
          strokeWidth={2}
        />

        // <ReferenceLine
        //   y={props.untereToleranz}
        //   label={{
        //     value: `USG`,
        //     style: { textAnchor: "middle" },
        //     angle: -90,
        //     position: "right",
        //     offset: 35,
        //   }}
        //   stroke="red"
        //   strokeWidth={2} 
        // >
        */}
        {/* <ReferenceLine y={props.nennmaß} label={{
            value: `NM`,
            style: { textAnchor: "middle" },
            angle: 0,
            position: "right",
            offset: 45
          }}  stroke="grey"  strokeWidth={1} strokeDasharray="5 5"/> */}
        {/* <ReferenceLine
          y={FindAverage(props.messwertlist)}
          label={{
            value: `x̄`,
            style: { textAnchor: "middle" },
            angle: 0,
            position: "right",
            offset: 60,
          }}
          stroke="blue"
          strokeWidth={2}
          strokeDasharray="3 4 5 2"
        />
        <ReferenceLine
          y={FindAverage(props.messwertlist) + Findcp(props.messwertlist)}
          label={{
            value: `+3σ`,
            style: { textAnchor: "middle" },
            angle: 0,
            position: "right",
            offset: 60,
          }}
          stroke="green"
          strokeWidth={1}
          strokeDasharray="3 4 5 2"
        />
        <ReferenceLine
          y={FindAverage(props.messwertlist) - Findcp(props.messwertlist)}
          label={{
            value: `-3σ`,
            style: { textAnchor: "middle" },
            angle: 0,
            position: "right",
            offset: 60,
          }}
          stroke="green"
          strokeWidth={1}
          strokeDasharray="3 4 5 2"
        /> */}
        <Tooltip />
        {/* <Legend /> */}
      </ComposedChart>
      {/* <LineChart
        width={600}
        height={300}
        data={Findnormaldistribution(props.messwertlist)}
        margin={{
          top: 10,
          right: 30,
          left: 30,
          bottom: 20,
        }}
      ></LineChart> */}
    </ResponsiveContainer>
  );
};

export default Normalverteilung;
