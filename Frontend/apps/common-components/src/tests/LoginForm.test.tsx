import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import LoginForm, { LoginFormResponse } from "../LoginForm";
import React from "react";

test("button is disabled after render", async () => {
  render(
    <BrowserRouter>
      <LoginForm onSubmitClick={(_) => LoginFormResponse.OK} />
    </BrowserRouter>
  );
  expect(await screen.getByRole("button")).toBeDisabled();
});

test("button is enabled after providing correct data", async () => {
  render(
    <BrowserRouter>
      <LoginForm onSubmitClick={(_) => LoginFormResponse.OK} />
    </BrowserRouter>
  );
  userEvent.type(
    screen.getByLabelText("Email: *", { selector: "input" }),
    "xyz123@gmail.com"
  );
  userEvent.type(
    screen.getByLabelText("Password: *", { selector: "input" }),
    "0000000"
  );
  expect(await screen.getByRole("button")).toBeEnabled();
});