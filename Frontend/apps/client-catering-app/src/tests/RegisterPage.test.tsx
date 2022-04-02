import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import "@testing-library/jest-dom/extend-expect";

test("button is disabled after render", async () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );
  expect(await screen.getByRole("button")).toBeDisabled();
});

test("button is enabled after providing correct data", async () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );
  userEvent.type(
    screen.getByLabelText("Name: *", { selector: "input" }),
    "AAbb"
  );
  userEvent.type(
    screen.getByLabelText("Surname: *", { selector: "input" }),
    "BBaa"
  );
  userEvent.type(
    screen.getByLabelText("Email: *", { selector: "input" }),
    "aabb@abab.com"
  );
  userEvent.type(
    screen.getByLabelText("Phone: *", { selector: "input" }),
    "111111111"
  );
  userEvent.type(
    screen.getByLabelText("Number: *", { selector: "input" }),
    "12"
  );
  userEvent.type(
    screen.getByLabelText("Postal code: *", { selector: "input" }),
    "22-222"
  );
  userEvent.type(
    screen.getByLabelText("City: *", { selector: "input" }),
    "aabbcc"
  );
  userEvent.type(
    screen.getByLabelText("Street: *", { selector: "input" }),
    "ccbbaa"
  );
  userEvent.type(
    screen.getByLabelText("Password: *", { selector: "input" }),
    "12345678"
  );
  userEvent.type(
    screen.getByLabelText("Confirm password: *", { selector: "input" }),
    "12345678"
  );
  expect(await screen.getByRole("button")).toBeEnabled();
});

test("link to log in is visible", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    expect(screen.getByText("Log in!")).toBeVisible();
  });