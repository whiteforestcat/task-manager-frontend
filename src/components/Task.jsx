import React, { useState, useEffect } from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
import loadingSpinner from "../assets/loader.gif";
import axios from "axios";
import { URL } from "../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = (props) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = async () => {
    setIsLoading(true); // loadspinner
    try {
      const res = await axios.get(`${URL}/api/tasks`);
      console.log(res);
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const getSingleTask = async (task) => {
    props.setFormData({
      name: task.name,
      completed: false,
    });
    props.setIsEditting(true);
    props.setTaskID(task._id);
  };

  return (
    <div className="task">
      <div>
        {isLoading && (
          <div className="--flex-center">
            <img src={loadingSpinner} alt="Loading" />
          </div>
        )}
        {!isLoading && tasks.length === 0 ? (
          <p className="--py">No task found.</p>
        ) : (
          <div>
            {tasks.map((task, index) => {
              return (
                <div key={task._id} className="flex">
                  <b>{index + 1}</b>
                  {task.name}
                  <div className={`task-icons flex justify-end`}>
                    <FaCheckDouble color="green" />
                    <FaEdit
                      color="purple"
                      onClick={() => getSingleTask(task)}
                    />
                    <FaRegTrashAlt
                      color="red"
                      onClick={() => deleteTask(task._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
