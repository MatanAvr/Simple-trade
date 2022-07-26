import React, { useState, useContext, useEffect } from "react";
import classes from "./MainScreen.module.css";
import Header from "./Header";
import Portfolio from "../User/Portfolio";
import Explanation from "../User/Explanation";
import Footer from "./Footer";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import TradeScreen from "./TradeScreen";
import Leaderboard from "../User/Leaderboard";
import Search from "../UI/Search";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const MainScreen = () => {
  const authCtx = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    isLoddegIn();
    setTimeout(authCtx.loadLeaderboard, 500);
  }, []);

  const isLoddegIn = () => {};

  const modalHandler = () => {
    authCtx.toggleError();
  };

  return (
    <div className={classes.container}>
      {showModal || authCtx.error ? (
        <Modal onClose={modalHandler}>
          <p>
            {authCtx.errorMsg ? authCtx.errorMsg : "Something went wrong"}
            <br /> Please try again :)
          </p>
          <Button title="Close" onClick={modalHandler} />
        </Modal>
      ) : (
        ""
      )}
      <Header />
      <div className={classes.upperCard}>
        {authCtx.userData ? (
          <>
            {`Welcome ${authCtx.userData.name}! `}
            {authCtx.trading.status ? <Search /> : ""}
            {`Available cash: $${authCtx.userData.balance.toFixed(2)}`}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <div className={classes.cards}>
        {authCtx.trading.status ? (
          <TradeScreen />
        ) : (
          <>
            <div className={classes.card}>
              <Portfolio />
            </div>
            <div className={classes.card}>
              <Explanation />
            </div>
            <div className={classes.card}>
              <Leaderboard />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainScreen;
