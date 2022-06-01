import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import {
  MyProfileIcon,
  Logo,
  UserProvider,
  UserType,
  UserContext,
  LogoutIcon,
  IngredientIcon,
} from "common-components";
import "./style/NavbarStyle.css";
import { useContext } from "react";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute";
import ProducerDietsList from "./pages/DietsList";
import IngredientsPage from "./pages/IngredientsPage";

const Root = () => {
  const userContext = useContext(UserContext);

  return (
    <BrowserRouter>
      <Link to="/">
        <Logo />
      </Link>
      {userContext?.isAuthenticated! && (
        <div>
          <Link to="/diets">
            <MyProfileIcon />
          </Link>
          <Link to="/ingredients">
            <IngredientIcon />
          </Link>
          <button
            className="logoutButton"
            onClick={(e: any) => userContext?.logout()}
          >
            <LogoutIcon />
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated!}>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/diets"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated!}>
              <ProducerDietsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/ingredients"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated!}>
              <IngredientsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={userContext?.isAuthenticated!}>
              <LoginPage />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <UserProvider userType={UserType.Producer}>
      <Root />
    </UserProvider>
  );
};

export default App;
