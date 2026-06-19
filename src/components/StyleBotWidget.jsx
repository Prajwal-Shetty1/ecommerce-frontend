import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StyleBotWidget.css";

const StyleBotWidget = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="forever-widget-wrap">
      <span className={`forever-widget-tooltip ${hovered ? "visible" : ""}`}>
        Chat with Forever
      </span>

      <button
        type="button"
        className="forever-widget-btn"
        onClick={() => navigate("/fashion-assistant")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label="Open Forever, your personal fashion assistant"
      >
        <span className="forever-widget-pulse" aria-hidden="true" />
        <span className="forever-widget-text">Forever</span>
      </button>
    </div>
  );
};

export default StyleBotWidget;