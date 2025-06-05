import React from "react";
import LineDrawing from "./LineDrawing";
import DynamicLineChart from "./DynamicLineChart";

export default function App() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Line chart as background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <DynamicLineChart />
      </div>

      {/* Transparent SVG canvas on top for drawing */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <LineDrawing />
      </div>
    </div>
  );
}
