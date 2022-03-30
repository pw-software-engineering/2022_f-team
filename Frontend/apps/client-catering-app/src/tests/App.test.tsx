import { render, screen } from "@testing-library/react";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";

test("renders initial text", () => {
  render(<App />);
  expect(screen.getByText("Client App")).toBeFalsy();
});

test("register page should render button with 'Register'", () =>{
  render(<RegisterPage/>);
  expect(screen.getByRole('button', {
    name: /Register/i
  })).toBeTruthy();
})
