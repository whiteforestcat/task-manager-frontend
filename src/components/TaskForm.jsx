import React from "react";

const TaskForm = (props) => {
  return (
    <div>
      <form
        action=""
        className="task-form"
        onSubmit={props.isEditting ? props.updateTask : props.createTaskForm}
      >
        <input
          type="text"
          placeholder="Add a task"
          name="name"
          //   value={props.formData.name}
          value={props.name} // better way to do it after destructuring formData state object
          onChange={props.handleInputChange}
        />
        <button type="submit">{props.isEditting ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
