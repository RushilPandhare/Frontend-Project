import React, { useEffect, useState } from "react";
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
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DynamicLineChart = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Node X Coordinates from MongoDB",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/graph")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched MongoDB Data:", data);

        const labels = data.nodes.map((node: any) => node.label);
        const xValues = data.nodes.map((node: any) => node.x);

        setChartData({
          labels,
          datasets: [
            {
              label: "X Position of Nodes",
              data: xValues,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.3,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflowX: "auto" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DynamicLineChart;
