import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import {
  CartIcon,
  MyProfileIcon,
  Logo,
  UserProvider,
  UserType,
  UserContext,
  LogoutIcon,
} from "common-components";
import "./style/NavbarStyle.css";
import { useContext, useState} from "react";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute";

const Root = () => {
  const userContext = useContext(UserContext);
  const [cartItems, setCartItems] = useState<Array<string>>([]);

  const AddToCart = (itemID: string) => {
    setCartItems([...cartItems,itemID]);
  };

  return (
    <BrowserRouter>
      <Link to="/">
        <Logo />
      </Link>
      {userContext?.isAuthenticated! && (
        <div>
          <Link to="#">
            <CartIcon count={cartItems.length} />
          </Link>
          <Link to="#">
            <MyProfileIcon />
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
              <MainPage AddToCart={AddToCart} />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={userContext?.isAuthenticated!}>
              <RegisterPage />
            </PublicRoute>
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
    <UserProvider userType={UserType.Client}>
      <Root />
    </UserProvider>
  );
};

export default App;
function setState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
