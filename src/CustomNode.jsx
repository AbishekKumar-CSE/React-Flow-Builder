// src/CustomNode.js
import React from "react";
import { Handle } from "reactflow";

const CustomNode = ({ id, data, selected }) => {
  const onDelete = () => {
    data.onDelete(id); // Call the onDelete function passed from the parent
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: selected ? "#f0f0f0" : "#fff",
      }}
    >
      <Handle type="target" position="top" />
      {data.image && <img src={data.image} alt="Node Image" style={{ width: "100%" }} />}
      {data.buttonText && <button>{data.buttonText}</button>}
      {data.link && (
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          {data.link}
        </a>
      )}
      {data.video && (
        <iframe
          src={data.video}
          title="Node Video"
          style={{ width: "100%", height: "200px" }}
        />
      )}
      <Handle type="source" position="bottom" />
      <button
        onClick={onDelete}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default CustomNode;