import { useState, useEffect } from "react";
import TaskList from "../../components/task/task-list";
import TaskForm from "../../components/task/task-form";
import Filter from "../../components/task/task-filter";
export default function TaskManager() {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);

  //   useEffect(() => {
  //     const data = taks;
  //     const filters
  //   }, [filter])
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <TaskForm tasks={tasks} setTasks={setTasks} />
        <Filter
          tasks={tasks}
          setTasks={setTasks}
          filter={filter}
          setFilter={setFilter}
        />
        <TaskList tasks={tasks} setTasks={setTasks} filter={filter} />
      </div>
    </div>
  );
}
