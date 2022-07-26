import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "./LoadingSpinner";
import classes from "./Graph.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "./Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false, // Don't maintain w/h ratio
};

let dataSet = {
  labels: [],
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  datasets: [
    {
      label: "Stock price",
      data: [],
      backgroundColor: "rgb(0, 99, 132)",
      borderColor: "rgb(0, 99, 132)",
    },
  ],
};

const Graph = (props) => {
  const authCtx = useContext(AuthContext);
  const graphLoaded = authCtx.graphLoaded;
  const [currentRange, setCurrentRange] = useState("INTRADAY");

  useEffect(() => {
    authCtx.loadGraph(props.symbol);
    setCurrentRange("INTRADAY");
  }, [authCtx.trading.symbol]);

  if (graphLoaded) {
    dataSet.datasets[0].label = props.symbol;
    dataSet.labels = [...authCtx.graphData.time];
    dataSet.datasets[0].data = [...authCtx.graphData.price];
  }

  const grpahRangeHandler = (newRanage) => {
    if (newRanage === currentRange) return;
    //Range: "MONTHLY" / "WEEKLY" / "DAILY" /"INTRADAY"
    setCurrentRange(newRanage);
    authCtx.loadGraph(props.symbol, newRanage);
  };

  return graphLoaded ? (
    <div className={classes.graphContainer}>
      <div className={classes.graphUI}>
        <Button
          type={currentRange === "MONTHLY" ? "navActive" : ""}
          title="Monthly"
          onClick={grpahRangeHandler.bind(null, "MONTHLY")}
        />
        <Button
          type={currentRange === "WEEKLY" ? "navActive" : ""}
          title="Weekly"
          onClick={grpahRangeHandler.bind(null, "WEEKLY")}
        />
        <Button
          type={currentRange === "DAILY" ? "navActive" : ""}
          title="Day"
          onClick={grpahRangeHandler.bind(null, "DAILY")}
        />
        <Button
          type={currentRange === "INTRADAY" ? "navActive" : ""}
          title="Interday"
          onClick={grpahRangeHandler.bind(null, "INTRADAY")}
        />
      </div>
      <div className={classes.chart}>
        <Line data={dataSet} options={options} />
      </div>
    </div>
  ) : props.symbol ? (
    <LoadingSpinner />
  ) : (
    <h2>Search a stock and start trading!</h2>
  );
};

export default Graph;
