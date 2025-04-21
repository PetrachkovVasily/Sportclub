import ApexCharts from "apexcharts";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  scales,
} from "chart.js";

import { Line } from "react-chartjs-2";

interface Props {}

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const chartData = {
  labels: ["Янв", "Фев", "Март", "Апр", "Май"],
  datasets: [
    {
      data: [120, 190, 300, 250, 220],
      fill: true,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#FFB74D",
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        font: {
          size: 12,
          weight: "semi-bold",
        },
        color: "#1F2937",
      },
    },
    x: {
      ticks: {
        display: false,
      },
    },
  },
};

function Chart(props: Props) {
  return <Line data={chartData} options={chartOptions} />;
}

export default Chart;
