import React, { useState } from "react";
import WorkflowCanvas from "./components/WorkflowCanvas";
import BarChart from "./components/Charts/BarChart";

function App() {
  const [chartData, setChartData] = useState([]);

  const updateNodesData = (nodes) => {
    setChartData(nodes.filter((node) => node.executionTime !== undefined));
  };

  return (
    <div>
      <h1>Interactive Workflow Dashboard</h1>
      <WorkflowCanvas updateNodesData={updateNodesData} />
      <div style={{ marginTop: "20px" }}>
        <h2>Execution Times</h2>
        <BarChart data={chartData} />
      </div>
    </div>
  );
}

export default App;
