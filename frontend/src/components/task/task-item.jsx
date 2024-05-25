// src/components/TaskItem.js
import React from "react";
import { AxiosInterceptor } from "../../config/axios-interceptor";
import Swal from "sweetalert2";

function TaskItem({ task, tasks, setTasks }) {
  const handleDelete = async () => {
    try {
      const response = await AxiosInterceptor.delete(
        `api/task/task/${task._id}`
      );
      if (response.status == 200) {
        const newTasks = tasks.filter((item, index) => {
          return item?._id != task?._id;
        });
        setTasks(newTasks);
        Swal.fire({
          title: "",
          text: "Deleted successfully",
          icon: "success",
        });
      }
    } catch (err) {
      Swal.fire({
        // title: "Good job!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  const handleStatusChange = async (e) => {
    try {
      const response = await AxiosInterceptor.patch(
        `/api/task/task/${task._id}`,
        { status: e.target.value }
      );

      if (response.status == 200) {
        // tasks, setTasks
        const newTasks = tasks.map((item, index) => {
          if (item?._id == task._id) {
            return response?.data?.data;
          } else {
            return item;
          }
        });
        setTasks(newTasks);
        Swal.fire({
          title: "",
          text: "Updated successfully",
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        // title: "Good job!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <div className="mt-4">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
