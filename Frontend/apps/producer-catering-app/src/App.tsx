import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import {Logo, MyProfileIcon} from "common-components";

const App = () => {
  return (
    <BrowserRouter>
    <Link to="/"><Logo /></Link>
    <Link to="/"><MyProfileIcon /></Link>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;