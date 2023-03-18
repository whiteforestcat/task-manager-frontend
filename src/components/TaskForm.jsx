import React from "react";

const TaskForm = (props) => {
  return (
    <div>
      <form action="" className="task-form" onSubmit={props.createTask}>
        <input
          type="text"
          placeholder="Add a task"
          name="name"
          value={props.name}
          onChange={props.handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TaskForm;
