import React, { useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import "../App.css";  // Ensure the relative path is correct

import Sidebar from "./Sidebar";
import AnalyticsPanel from "./AnalyticsPanel";
import { StartNode, TaskNode, DecisionNode, EndNode } from "./CustomNodes";
const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  decision: DecisionNode,
  end: EndNode,
};

const WorkflowCanvas = ({ updateNodesData }) => {
  const initialNodes = [
    { id: "1", position: { x: 250, y: 5 }, data: { label: "Start Node", type: "Start", executionTime: 0 } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const onNodeClick = (_, node) => setSelectedNode(node);

  const updateNodeProperties = (id, updates) => {
    const updatedNodes = nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...updates } } : node
    );
    pushToHistory();
    setNodes(updatedNodes);
  };

  const pushToHistory = () => {
    setHistory((prev) => [...prev, { nodes, edges }]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, { nodes, edges }]);
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, { nodes, edges }]);
    setNodes(nextState.nodes);
    setEdges(nextState.edges);
  };

  const saveWorkflow = () => {
    const workflow = { nodes, edges, history, redoStack };
    localStorage.setItem("workflow", JSON.stringify(workflow));
    alert("Workflow saved successfully!");
  };

  const loadWorkflow = () => {
    const savedWorkflow = localStorage.getItem("workflow");
    if (savedWorkflow) {
      const { nodes: savedNodes, edges: savedEdges, history: savedHistory, redoStack: savedRedoStack } = JSON.parse(savedWorkflow);
      setNodes(savedNodes);
      setEdges(savedEdges);
      setHistory(savedHistory || []);
      setRedoStack(savedRedoStack || []);
    } else {
      alert("No saved workflow found!");
    }
  };

  const exportWorkflow = () => {
    const workflow = { nodes, edges, history, redoStack };
    const blob = new Blob([JSON.stringify(workflow)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "workflow.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importWorkflow = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const importedWorkflow = JSON.parse(reader.result);
        setNodes(importedWorkflow.nodes || []);
        setEdges(importedWorkflow.edges || []);
        setHistory(importedWorkflow.history || []);
        setRedoStack(importedWorkflow.redoStack || []);
      };
      reader.readAsText(file);
    }
  };

  const addNode = (type) => {
    const id = (nodes.length + 1).toString();
    const position = { x: 250 + nodes.length * 50, y: 100 + nodes.length * 50 };
    let label = type;

    if (type === "Decision") label = "Decision Node";
    if (type === "Task") label = "Task Node";
    if (type === "Start") label = "Start Node";
    if (type === "End") label = "End Node";

    const newNode = {
      id,
      position,
      data: { label, type, executionTime: 0 },
    };
    setNodes((prev) => [...prev, newNode]);
    pushToHistory();
  };

  useEffect(() => {
    updateNodesData(nodes.map((node) => node.data));
  }, [nodes]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <header style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", textAlign: "center" }}>
        <h1>Interactive Workflow Builder</h1>
      </header>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 3, border: "1px solid #ccc", overflow: "hidden" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
            onNodeClick={onNodeClick}
            fitView
          >
            <Controls />
            <Background color="#e0e0e0" gap={16} />
          </ReactFlow>
        </div>
        <div style={{ flex: 1, padding: "10px", overflowY: "auto", borderLeft: "1px solid #ccc" }}>
          <Sidebar selectedNode={selectedNode} updateNodeProperties={updateNodeProperties} />
        </div>
      </div>
      <div style={{ padding: "10px", borderTop: "1px solid #ccc", display: "flex", justifyContent: "center", gap: "10px", backgroundColor: "#f9f9f9" }}>
        <button onClick={() => addNode("Start")} style={buttonStyle}>Add Start Node</button>
        <button onClick={() => addNode("Task")} style={buttonStyle}>Add Task Node</button>
        <button onClick={() => addNode("Decision")} style={buttonStyle}>Add Decision Node</button>
        <button onClick={() => addNode("End")} style={buttonStyle}>Add End Node</button>
        <button onClick={saveWorkflow} style={buttonStyle}>Save Workflow</button>
        <button onClick={loadWorkflow} style={buttonStyle}>Load Workflow</button>
        <button onClick={exportWorkflow} style={buttonStyle}>Export Workflow</button>
        <input type="file" accept=".json" onChange={importWorkflow} style={{ ...buttonStyle, padding: "10px" }} />
        <button onClick={undo} style={buttonStyle}>Undo</button>
        <button onClick={redo} style={buttonStyle}>Redo</button>
      </div>
      <div style={{ flex: 1, padding: "10px", borderTop: "1px solid #ccc", overflowY: "auto" }}>
        <AnalyticsPanel nodes={nodes} />
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  textTransform: "uppercase",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  width: "auto", /* Default to auto */
};

/* Add media queries for responsiveness */
const style = document.createElement('style');
style.innerHTML = `
  @media screen and (max-width: 768px) {
    .react-flow__pane {
      width: 100% !important;
    }
    .react-flow__node {
      width: 100% !important;
    }
    button {
      width: 100% !important;
      padding: 12px;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 480px) {
    button {
      width: 100% !important;
      font-size: 12px;
    }
  }
`;
document.head.appendChild(style);

export default WorkflowCanvas;
