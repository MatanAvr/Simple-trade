import React, { useContext } from "react";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/auth-context";
// import MainScreen from "./components/Layout/MainScreen";
import MainScreenMUI from "./components/Layout/MainScreenMUI";

let init = true;

function App() {
  const authCtx = useContext(AuthContext);

  //Check if a user is already logged in
  const token = localStorage.getItem("token");
  if (token && init) {
    init = false;
    authCtx.checkToken(token);
  }

  return (
    <>
      {!authCtx.isLoggedIn && <AuthForm />}
      {authCtx.isLoggedIn && <MainScreenMUI />}
    </>
  );
}

export default App;
