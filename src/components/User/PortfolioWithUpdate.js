import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./PortfolioWithUpdate.module.css";

const BASE_URL = "https://simple-trade-israel-dev.herokuapp.com";

const PortfolioWithUpdate = (props) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [currentPrice, setCurrentPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const currentSymbol = props.item.symbol;

  const getCurrentPrice = async function () {
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
      if (!response.ok) {
        setLoading(false);
        setCurrentPrice("FAILED");
        return;
      }
      const data = await response.json();
      const pl = (
        ((data.currentPrice - props.item.price) / props.item.price) *
        100
      ).toFixed(2);

      setLoading(false);
      setCurrentPrice(pl);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getCurrentPrice(currentSymbol);
  }, []);

  return (
    <>
      {`${props.item.symbol}, Qty: ${props.item.quantity},
  average buy price: $${props.item.price.toFixed(2)}`}
      {loading ? (
        <LoadingSpinner size="small" />
      ) : (
        <div>
          {" "}
          P/L:
          <span
            className={
              currentPrice > 0
                ? classes.green
                : currentPrice < 0
                ? classes.red
                : ""
            }
          >
            {currentPrice}%
          </span>
        </div>
      )}
    </>
  );
};

export default PortfolioWithUpdate;
