import { render, screen } from "@testing-library/react";
import App from "../App";

test("logo is present", () => {
  render(<App />);
  expect(screen.getByTestId('logo')).toBeTruthy();
});
