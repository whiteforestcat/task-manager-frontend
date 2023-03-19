import React, { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

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

  const createTaskForm = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
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
