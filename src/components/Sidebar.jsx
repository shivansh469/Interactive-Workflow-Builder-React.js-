import React from "react";
import PropTypes from "prop-types";

const Sidebar = ({ selectedNode, updateNodeProperties }) => {
  if (!selectedNode) {
    return <p>Select a node to edit its properties.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateNodeProperties(selectedNode.id, { [name]: value });
  };

  return (
    <div>
      <h3>Node Properties</h3>
      <p><strong>ID:</strong> {selectedNode.id}</p>
      <label>
        <strong>Label:</strong>
        <input
          type="text"
          name="label"
          value={selectedNode.data.label || ""}
          onChange={handleInputChange}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "8px",
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </label>
      <label>
        <strong>Execution Time:</strong>
        <input
          type="number"
          name="executionTime"
          value={selectedNode.data.executionTime || 0}
          onChange={handleInputChange}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "8px",
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </label>
    </div>
  );
};

Sidebar.propTypes = {
  selectedNode: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      label: PropTypes.string,
      executionTime: PropTypes.number,
    }).isRequired,
  }),
  updateNodeProperties: PropTypes.func.isRequired,
};

export default Sidebar;
