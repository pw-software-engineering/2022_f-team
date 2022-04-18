import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import {Logo, LogoutIcon, MyProfileIcon} from "common-components";
import "./style/NavbarStyle.css"

const App = () => {
  return (
    <BrowserRouter>
    <Link to="/"><Logo /></Link>
    <Link to="/"><MyProfileIcon /></Link>
    <LogoutIcon />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;