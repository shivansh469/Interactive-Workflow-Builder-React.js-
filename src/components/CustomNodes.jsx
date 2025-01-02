import React from "react";

// Start Node
export const StartNode = ({ data }) => (
  <div style={styles.start}>{data.label || "Start"}</div>
);

// Task Node
export const TaskNode = ({ data }) => (
  <div style={styles.task}>{data.label || "Task"}</div>
);

// Decision Node
export const DecisionNode = ({ data }) => (
  <div style={styles.decision}>{data.label || "Decision"}</div>
);

// End Node
export const EndNode = ({ data }) => (
  <div style={styles.end}>{data.label || "End"}</div>
);

const styles = {
  start: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "50%",
    textAlign: "center",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  task: {
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "white",
    borderRadius: "8px",
    textAlign: "center",
    width: "100px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  decision: {
    padding: "10px",
    backgroundColor: "#FFC107",
    color: "black",
    borderRadius: "8px",
    textAlign: "center",
    width: "100px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  end: {
    padding: "10px",
    backgroundColor: "#F44336",
    color: "white",
    borderRadius: "50%",
    textAlign: "center",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
};
