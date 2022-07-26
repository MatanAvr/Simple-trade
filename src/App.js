import React, { useContext } from "react";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/auth-context";
import MainScreen from "./components/Layout/MainScreen";

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
      {authCtx.isLoggedIn && <MainScreen />}
    </>
  );
}

export default App;
