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
import { useContext, useState } from "react";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute";
import OrderPage from "./pages/OrderPage";
import MyProfilePage from "./pages/MyProfilePage";

const Root = () => {
  const userContext = useContext(UserContext);
  const [cartItems, setCartItems] = useState<Array<string>>([]);

  const AddToCart = (itemID: string) => {
    setCartItems([...cartItems, itemID]);
  };

  const ClearCartItems = () => {
    setCartItems([]);
  };

  return (
    <BrowserRouter>
      <Link to="/">
        <Logo />
      </Link>
      {userContext?.isAuthenticated! && (
        <div>
          {cartItems.length > 0 && (
            <Link to="/order">
              <CartIcon count={cartItems.length} />
            </Link>
          )}
          {cartItems.length == 0 && <CartIcon count={cartItems.length} />}
          <Link to="/profile">
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
        <Route
          path="/order"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated!}>
              <OrderPage
                cartItems={cartItems}
                clearCartItems={ClearCartItems}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={userContext?.isAuthenticated!}>
              <MyProfilePage />
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
