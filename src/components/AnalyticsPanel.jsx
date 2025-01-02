import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPanel = ({ nodes }) => {
  // Data for Execution Time per Node
  const executionTimeData = nodes.map((node, index) => ({
    name: `Node ${index + 1}`,
    executionTime: node.data.executionTime || 0,
  }));

  // Data for Cumulative Execution Time
  const cumulativeData = executionTimeData.map((data, index) => ({
    name: data.name,
    cumulativeTime: executionTimeData.slice(0, index + 1).reduce((sum, d) => sum + d.executionTime, 0),
  }));

  // Data for Node Type Distribution
  const nodeTypeData = Object.values(
    nodes.reduce((acc, node) => {
      const type = node.data.type || "Unknown";
      if (!acc[type]) acc[type] = { name: type, count: 0 };
      acc[type].count += 1;
      return acc;
    }, {})
  );

  return (
    <div style={{ padding: "15px", background: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Analytics Panel</h3>

      {/* Execution Time per Node */}
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <h4>Execution Time per Node</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={executionTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="executionTime" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cumulative Execution Time */}
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <h4>Cumulative Execution Time</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cumulativeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cumulativeTime" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Node Type Distribution */}
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <h4>Node Type Distribution</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={nodeTypeData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {nodeTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
