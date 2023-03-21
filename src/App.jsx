import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import TaskList from "./components/TaskList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <ToastContainer />
      <div className="task-container">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
