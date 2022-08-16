import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./TradeScreen.module.css";
import Button from "@mui/material/Button";
import TradeForm from "./TradeForm";
import RefreshIcon from "@mui/icons-material/Refresh";
import Graph from "../UI/Graph";
import Typography from "@mui/material/Typography";

const BASE_URL = "https://simple-trade-israel-dev.herokuapp.com";

const TradeScreen = (props) => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const token = authCtx.token;

  const currentSymbol = authCtx.trading.symbol;

  const getQuote = async function () {
    if (currentSymbol === "") return;
    setLoading(true);
    const URLextension = "/portfolio/symbol/";
    const url = `${BASE_URL}${URLextension}${currentSymbol}`;

    try {
      const response = await fetch(url, {
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        authCtx.toggleError(data.error);
        return;
      }
      setPrice(data.currentPrice);
      setLoading(false);
    } catch (err) {
      authCtx.toggleError(err);
    }
  };

  useEffect(() => {
    getQuote(currentSymbol);
  }, [currentSymbol]);

  return (
    <div className={classes.tradeScreen}>
      <Button
        style={{ textTransform: "none", width: "90%", alignSelf: "center" }}
        size="small"
        variant="outlined"
        onClick={authCtx.loadTradeScreen.bind(null, "back")}
      >
        Go back
      </Button>
      <div className={classes.cards}>
        <div className={classes.card1}>
          <Graph symbol={currentSymbol} />
        </div>

        <div className={classes.card2}>
          <Typography variant="h5">{`Trade ${currentSymbol}`}</Typography>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <Typography>{`Current price: $${price}`}</Typography>
          )}
          <Button onClick={getQuote} variant="outlined" size="small">
            <RefreshIcon />
          </Button>
        </div>

        <div className={classes.card3}>
          <TradeForm symbol={currentSymbol} price={price} />
        </div>
      </div>
    </div>
  );
};

export default TradeScreen;
