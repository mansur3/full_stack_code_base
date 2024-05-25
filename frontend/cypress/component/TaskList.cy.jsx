import React from "react";
import { mount } from "@cypress/react";
import { AxiosInterceptor } from "../../src/config/axios-interceptor";
import TaskList from "../../src/components/task/task-list";

describe("TaskList Component", () => {
  it("sets sessionStorage", () => {
    cy.window().then((window) => {
      window.sessionStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkRhdGEiOnsiX2lkIjoiNjY0ZjY2NTZkMzE1YmI3YjQ5MDJkYTQ2IiwiZmlyc3RfbmFtZSI6ImZpcnN0IiwibGFzdF9uYW1lIjoibmFtZSIsImVtYWlsIjoiZW1haTJnbWFpbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCRGRnlEcExDWDdsa2w2SWNXMWVHZDh1UGdjb25tMWFLODRwSjV5SGJVaTJnQ0Z6VGlQTTJObSIsImNvdW50cnkiOiJDQSIsInBob25lX251bWJlciI6IjgyNTAyNDg5OTEiLCJjcmVhdGVkQXQiOiIyMDI0LTA1LTIzVDE1OjUyOjU0LjQ3MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA1LTIzVDE1OjUyOjU0LjQ3MFoifSwiaWF0IjoxNzE2NjE2NzkyLCJleHAiOjE3MTcyMjE1OTJ9.9sav6xmQt9clYsOo3xBpt2ypFnCv0JLRYkd4wNMGHIg"
      );
    });
  });

  it("fetches tasks based on filter", () => {
    const filter = "To Do";
    const tasks = [];
    const setTasks = cy.stub().as("setTasks");
    cy.window().then((window) => {
      window.sessionStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkRhdGEiOnsiX2lkIjoiNjY0ZjY2NTZkMzE1YmI3YjQ5MDJkYTQ2IiwiZmlyc3RfbmFtZSI6ImZpcnN0IiwibGFzdF9uYW1lIjoibmFtZSIsImVtYWlsIjoiZW1haTJnbWFpbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwOCRGRnlEcExDWDdsa2w2SWNXMWVHZDh1UGdjb25tMWFLODRwSjV5SGJVaTJnQ0Z6VGlQTTJObSIsImNvdW50cnkiOiJDQSIsInBob25lX251bWJlciI6IjgyNTAyNDg5OTEiLCJjcmVhdGVkQXQiOiIyMDI0LTA1LTIzVDE1OjUyOjU0LjQ3MFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA1LTIzVDE1OjUyOjU0LjQ3MFoifSwiaWF0IjoxNzE2NjE2NzkyLCJleHAiOjE3MTcyMjE1OTJ9.9sav6xmQt9clYsOo3xBpt2ypFnCv0JLRYkd4wNMGHIg"
      );
    });
    mount(<TaskList filter={filter} tasks={tasks} setTasks={setTasks} />);
  });
});
