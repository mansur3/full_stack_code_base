// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import TaskItem from "./task-item";
import { AxiosInterceptor } from "../../config/axios-interceptor";
import Swal from "sweetalert2";

function TaskList({ filter, tasks, setTasks }) {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await AxiosInterceptor.get(
          `/api/task/tasks?status=${filter}`
        );
        setTasks(response?.data?.data);
      } catch (err) {
        Swal.fire({
          // title: "Good job!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    };
    fetchTasks();
  }, [filter]);

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem tasks={tasks} setTasks={setTasks} key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
