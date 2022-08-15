import React, { useState, useContext, useEffect } from "react";
import classes from "./MainScreen.module.css";
import Header from "./Header";
// import Portfolio from "../User/Portfolio";
import PortfolioMUI from "../User/PortfolioMUI";
import Explanation from "../User/Explanation";
import Footer from "./Footer";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import TradeScreen from "./TradeScreen";
import Leaderboard from "../User/Leaderboard";
import Search from "../UI/Search";
import Modal from "../UI/Modal";
// import Button from "../UI/Button";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

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
          <Typography>
            {authCtx.errorMsg ? authCtx.errorMsg : "Something went wrong"}
            <br /> Please try again :) <br />
          </Typography>
          <Button
            style={{ textTransform: "none", marginTop: "20px" }}
            size="small"
            variant="outlined"
            onClick={modalHandler}
          >
            Confirm
          </Button>
        </Modal>
      ) : (
        ""
      )}
      <Header />
      <div className={classes.upperCard}>
        {authCtx.userData ? (
          <>
            <Typography>Welcome {authCtx.userData.name}!</Typography>

            <Search />

            <Typography>
              Available cash: {authCtx.userData.balance.toFixed(2)}$
            </Typography>
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
            <div className={classes.portfoliocard}>
              {/* <Portfolio /> */}
              <PortfolioMUI />
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
