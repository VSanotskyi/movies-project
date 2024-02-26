import ReactDOM from "react-dom/client";

import App from "./App";
import ThemProvider from "./hoc/ThemProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ThemProvider>
    <App />
  </ThemProvider>
);
