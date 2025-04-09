import React from "react";
import "./JsonUIRendererPage.css";
import ReactJsonRenderer from "./ReactJsonRenderer";
import { generateCodeFromJson } from "./generateCodeFromJson";

const JsonUIRendererPage = ({ jsonstructure }) => {
  const { jsxCodeString, cssCodeString } = generateCodeFromJson(jsonstructure);

  return (
    <div className="page">
      <div className="left-panel">
        <div className="code-section">
          <h3>🧩 React JSX</h3>
          <pre>{jsxCodeString}</pre>
        </div>
        <div className="code-section">
          <h3>🎨 CSS</h3>
          <pre>{cssCodeString}</pre>
        </div>
      </div>

      <div className="right-panel">
        <h3>✨ Live Rendered UI</h3>
        <div className="preview-box">
          {jsonstructure && <ReactJsonRenderer structure={jsonstructure} />}
        </div>
      </div>
    </div>
  );
};

export default JsonUIRendererPage;
