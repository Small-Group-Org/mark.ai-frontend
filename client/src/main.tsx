import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Import the global functions helper to initialize it
import "@/lib/globalFunctions";

// Initialize the app
createRoot(document.getElementById("root")!).render(<App />);
