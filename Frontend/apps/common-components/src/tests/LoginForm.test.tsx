import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "../LoginForm";
import React from "react";

test("button is disabled after render", async () => {
  render(
    <BrowserRouter>
      <LoginForm
        onSubmitClick={() => true}
        onValueChange={(_1, _2) => true}
        validateForm={() => false}
      />
    </BrowserRouter>
  );
  expect(await screen.getByRole("button")).toBeDisabled();
});

test("button is enabled after succesful validation", async () => {
  render(
    <BrowserRouter>
      <LoginForm
        onSubmitClick={() => true}
        onValueChange={(_1, _2) => true}
        validateForm={() => true}
      />
    </BrowserRouter>
  );
  expect(await screen.getByRole("button")).toBeEnabled();
});