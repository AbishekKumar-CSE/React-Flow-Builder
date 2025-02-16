import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import { nanoid } from "nanoid";

const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [];
const initialEdges = [];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Handle node changes (e.g., dragging, resizing)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Add a new node
  const onAddNode = (newNode) => {
    const lastNode = nodes[nodes.length - 1];
    const newNodePosition = lastNode
      ? { x: lastNode.position.x + 200, y: lastNode.position.y } // Place next to the last node
      : { x: 0, y: 0 }; // First node at (0, 0)

    const nodeWithPosition = {
      ...newNode,
      id: nanoid(), // Use nanoid for unique IDs
      position: newNodePosition,
      data: {
        ...newNode.data,
        onDelete: onDeleteNode, // Pass the onDelete function to the node
      },
    };

    setNodes((nds) => nds.concat(nodeWithPosition));
  };

  // Delete a node
  const onDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  }, []);

  // Save nodes and edges to local storage
  const onSave = () => {
    const flowData = {
      nodes,
      edges,
    };
    localStorage.setItem("flowData", JSON.stringify(flowData)); // Save to local storage
    alert("Flow saved successfully!"); // Notify the user
    console.log(nodes); // Log all nodes
    console.log(edges); // Log all edges
  };

  

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div style={{ flexGrow: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#333" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
      <Sidebar onAddNode={onAddNode} onSave={onSave} />
    </div>
  );
}

export default App;