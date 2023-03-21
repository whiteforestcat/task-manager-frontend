import React, { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import { URL } from "../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TaskList = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  // destructure out name from formData
  const { name } = formData;

  const handleInputChange = (e) => {
    // setFormData({ ...formData, name: e.target.name });
    setFormData({ ...formData, name: e.target.value });
  };

  const createTaskForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
        // const res = await fetch("http://127.0.0.1:5000/api/tasks", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });
        // const data = await res.json();
        // console.log(data);
      await axios.post(`${URL}/api/tasks`, formData);
      setFormData({ ...formData, name: "" });
      toast.success("Task added successfully")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        formData={formData}
        handleInputChange={handleInputChange}
        createTaskForm={createTaskForm}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks: </b> 0
        </p>
        <p>
          <b>Completed Tasks: </b> 0
        </p>
      </div>
      <hr />
      {/* <hr /> creates a line */}
      <Task />
    </div>
  );
};

export default TaskList;
