import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <p>hello</p>
  </StrictMode>
);
