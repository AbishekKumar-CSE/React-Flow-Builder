import React, { useState } from "react";
import { nanoid } from "nanoid";

const Sidebar = ({ onAddNode, onSave }) => {
  const [image, setImage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [link, setLink] = useState("");
  const [video, setVideo] = useState("");

  const handleAddNode = () => {
    const newNode = {
      id: nanoid(), // Use nanoid for unique IDs
      type: "customNode",
      data: {
        image: image || null,
        buttonText: buttonText || null,
        link: link || null,
        video: video || null,
      },
    };
    onAddNode(newNode); // Pass the new node to the parent component
    setImage("");
    setButtonText("");
    setLink("");
    setVideo("");
  };

  return (
    <div
      className="text-center shadow py-5"
      style={{ width: "250px", padding: "10px", borderRight: "1px solid #ddd", backgroundColor: "#f0f0f0" }}
    >
      <h3 className="fw-bold text-primary">Add Node</h3>
      <div className="py-2">
        <label className="fw-bold">Image URL:</label>
        <input
          className="rounded p-1 mt-1 shadow"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="py-2">
        <label className="fw-bold">Button Text:</label>
        <input
          className="rounded p-1 mt-1 shadow"
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
      </div>
      <div className="py-2">
        <label className="fw-bold">Link Field:</label>
        <input
          className="rounded p-1 mt-1 shadow"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div className="py-2">
        <label className="fw-bold">Video URL:</label>
        <input
          className="rounded p-1 mt-1 shadow"
          type="text"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
      </div>

      <div className="row gap-2 m-2">
        <button className="btn btn-primary" onClick={handleAddNode} style={{
        width: '100px'
      }}>
          Add Node
        </button>
        <button className="btn btn-success" onClick={onSave} style={{
        width: '100px'
      }}>
          Save Flow
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
