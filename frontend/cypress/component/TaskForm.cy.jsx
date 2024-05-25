// cypress/integration/taskForm.spec.js

import React from "react";
import { mount } from "@cypress/react";
import TaskForm from "../../src/components/task/task-form"; // Update the path accordingly

describe("TaskForm Component", () => {
  it("submits the form and adds a new task", () => {
    const tasks = [];
    const setTasks = cy.stub().as("setTasks");

    mount(<TaskForm tasks={tasks} setTasks={setTasks} />);

    // Fill in the form fields
    cy.get('input[placeholder="Title"]').type("Test Task");
    cy.get('textarea[placeholder="Description"]').type("Test Description");
    cy.get("select").select("To Do");

    // Intercept the POST request and mock the response
    cy.intercept("/api/task/create-task", {
      statusCode: 201,
      body: {
        data: {
          id: 1,
          title: "Test Task",
          description: "Test Description",
          status: "To Do",
        },
      },
    }).as("createTask");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check if the POST request was made with the expected data
    cy.wait("@createTask").then((interception) => {
      const requestData = interception.request.body;
      expect(requestData).to.deep.equal({
        title: "Test Task",
        description: "Test Description",
        status: "To Do",
      });
    });

    // Check if setTasks was called with the expected arguments
    cy.get("@setTasks").should("have.been.calledOnceWith", [
      {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        status: "To Do",
      },
    ]);
  });
});
