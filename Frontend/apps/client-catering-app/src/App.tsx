import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DietListPage from "./pages/DietListPage";
import {
  CartIcon,
  MyProfileIcon,
  Logo,
  UserProvider,
  UserType,
  UserContext,
  LogoutIcon,
} from "common-components";
import { PrivateRoute } from "./Routes/PrivateRoute";
import "./style/NavbarStyle.css";
import { useContext } from "react";
import { PublicRoute } from "./Routes/PublicReoute";

const Root = () => {
  const userContext = useContext(UserContext);

  return (
    <BrowserRouter>
      <Link to="#">
        <Logo />
      </Link>
      <Link to="#">
        <CartIcon />
      </Link>
      <Link to="#">
        <MyProfileIcon />
      </Link>
      <LogoutIcon />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated}>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={userContext?.isAuthenticated}>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={userContext?.isAuthenticated}>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/diet"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated}>
              <DietListPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <UserProvider userType={UserType.Client}>
      <Root />
    </UserProvider>
  );
};

export default App;
