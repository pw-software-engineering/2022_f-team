import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DietListPage from "./pages/DietListPage";
import { CartIcon, MyProfileIcon, Logo, UserProvider } from "common-components"
import './style/NavbarStyle.css'

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Link to="/"><Logo /></Link>
        <Link to="/"><CartIcon /></Link>
        <Link to="/"><MyProfileIcon /></Link>
        <Routes >
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/diet" element={<DietListPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
