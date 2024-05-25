import React, { useState } from "react";
import { AxiosInterceptor } from "../../config/axios-interceptor";
import Swal from "sweetalert2";

function TaskForm(props) {
  const { tasks, setTasks } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: title,
        description: description,
        status: status,
      };
      const response = await AxiosInterceptor.post(
        "/api/task/create-task",
        data
      );
      if (response.status == 201) {
        setTasks([...tasks, response?.data?.data]);
        setTitle("");
        setDescription("");
        setStatus("To Do");
      } else {
        Swal.fire({
          // title: "Good job!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        // title: "Good job!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div className="mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
