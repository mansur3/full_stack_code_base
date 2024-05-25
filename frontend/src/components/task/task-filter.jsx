// src/components/Filter.js
import React from "react";

function Filter({ filter, setFilter }) {
  return (
    <div className="mb-4">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default Filter;
