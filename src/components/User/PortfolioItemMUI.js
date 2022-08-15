import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Button, Chip } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const BASE_URL = "https://simple-trade-israel-dev.herokuapp.com";

const PortfolioItemMUI = (props) => {
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
  const backgroundColor = props.index % 2 === 0 ? "rgba(25,118,210,0.2)" : "";
  return (
    <TableRow key={props.item._id} style={{ backgroundColor: backgroundColor }}>
      <TableCell align="center">{props.item.symbol}</TableCell>
      <TableCell align="center">{props.item.quantity}</TableCell>
      <TableCell align="center">{props.item.price.toFixed(2)}$</TableCell>
      <TableCell align="right">
        {loading ? (
          <LoadingSpinner size="small" />
        ) : (
          <Chip
            label={`${currentPrice}%`}
            size="small"
            color={
              currentPrice > 0 ? "success" : currentPrice < 0 ? "error" : "info"
            }
          />
        )}
      </TableCell>
      <TableCell align="center">
        <Button
          size="small"
          onClick={authCtx.loadTradeScreen.bind(null, props.item.symbol)}
        >
          <DoubleArrowIcon size="small" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PortfolioItemMUI;
