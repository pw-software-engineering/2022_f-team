import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DietListPage from "./pages/DietListPage";
import {CartIcon, MyProfileIcon } from "common-components"
import './style/NavbarStyle.css'

const App = () => {
  return (
    <BrowserRouter>
    <CartIcon />
    <MyProfileIcon />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diet" element={<DietListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
