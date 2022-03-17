import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders initial text", () => {
  render(<App />);
  expect(screen.getByText("Deliverer App")).toBeTruthy();
});
