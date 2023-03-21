import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import { URL } from "../App";
import loadingSpinner from "../assets/loader.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [taskID, setTaskID] = useState("");

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
      toast.success("Task added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getTasks = async () => {
    setIsLoading(true); // loadspinner
    try {
      const res = await axios.get(`${URL}/api/tasks`);
      console.log(res);
      //   setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  };

  //   const getSingleTask = async (task) => {
  //     props.setFormData({
  //       name: task.name,
  //       completed: false,
  //     });
  //   };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Input field cannot be empty.");
    }
    try {
      await axios.patch(`${URL}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditting(false);
      //   getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

//   useEffect(() => {
//     getTasks();
//   }, [formData]);

  return (
    <div>
      <ToastContainer />
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        formData={formData}
        handleInputChange={handleInputChange}
        createTaskForm={createTaskForm}
        isEditting={isEditting}
        updateTask={updateTask}
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
      {/* {isLoading && (
        <div className="--flex-center">
          <img src={loadingSpinner} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task found.</p>
      ) : (
        <div>
          {tasks.map((task, index) => {
            return <Task />;
          })}
        </div>
      )} */}
      <Task
        formData={formData}
        setFormData={setFormData}
        setIsEditting={setIsEditting}
        setTaskID={setTaskID}
        taskID={setTaskID}
      />
    </div>
  );
};

export default TaskList;
