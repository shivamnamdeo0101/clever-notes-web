import React, { useEffect, useRef } from "react";
import * as Babel from "@babel/standalone";

const ImageToReactRenderer = ({ jsxCode, cssCode }) => {
  const mountRef = useRef();

  useEffect(() => {
    if (jsxCode && mountRef.current) {
      // Compile JSX → JS function
      const codeToEval = Babel.transform(
        `
          function RenderedComponent() {
            return (
              ${jsxCode}
            );
          }
          RenderedComponent;
        `,
        { presets: ["react"] }
      ).code;

      const RenderedComponent = eval(codeToEval); // Get actual component function

      // Clean and mount
      mountRef.current.innerHTML = "";
      const container = document.createElement("div");
      mountRef.current.appendChild(container);

      const root = window.ReactDOM.createRoot(container);
      root.render(<RenderedComponent />);
    }
  }, [jsxCode]);

  // Inject CSS into document head
  useEffect(() => {
    if (cssCode) {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = cssCode;
      document.head.appendChild(styleTag);

      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, [cssCode]);

  return <div ref={mountRef}></div>;
};

export default ImageToReactRenderer;
