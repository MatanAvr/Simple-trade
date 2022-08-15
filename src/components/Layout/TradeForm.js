import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./TradeForm.module.css";
import Dropdown from "../UI/Dropdown";
import LoadingSpinner from "../UI/LoadingSpinner";
// import Button from "../UI/Button";
import Button from "@mui/material/Button";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

const dropdownOptions = [
  { label: "Buy", value: "buy" },
  { label: "Sell", value: "sell" },
];

const TradeForm = (props) => {
  const authCtx = useContext(AuthContext);
  const loadingOrder = authCtx.loadingOrder;
  const currentPortfolio = authCtx.portfolio;
  const symbol = props.symbol;

  const maxQuantity = maxStocksQuantity(currentPortfolio, symbol);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [orderValue, setOrderValue] = useState(100);
  const [orderType, setOrderType] = useState("buy");
  const [errMsg, setErrMsg] = useState("");
  const [init, setInit] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    setPrice(props.price);
    const currentQuantity = quantity;
    const currentPrice = price;
    setOrderValue((currentQuantity * currentPrice).toFixed(2));
  }, [price, quantity, props]);

  useEffect(() => {
    if (!init) {
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
      }, 2000);
    }
  }, [authCtx.userData.balance]);

  const quantityChangeHandler = (event) => {
    event.preventDefault();
    // console.log(event.currentTarget.value);
    let newQuantity = quantity;
    const action = event.currentTarget.value;

    if (isNaN(newQuantity)) alert("Plase enter a number");
    else if (action === "+") newQuantity++;
    else if (action === "-" && newQuantity > 1) newQuantity--;
    else if (action === "Max") newQuantity = maxQuantity;
    else if (newQuantity < 1) newQuantity = 1;

    setQuantity(newQuantity);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setInit(false);
    setErrMsg("");

    if (quantity < 1 || quantity % 1 !== 0) {
      console.log(quantity & 1);
      errMsgHandler("Quantity must be a whole number greater than 0");
      return;
    }
    if (orderType === "sell" && quantity > maxQuantity) {
      errMsgHandler("You dont have enough stocks");
      return;
    }
    if (orderType === "buy" && orderValue > authCtx.userData.balance) {
      errMsgHandler("You dont have enough balance");
      return;
    }
    if (!price || price < 0) {
      errMsgHandler("Something wrong with the price");
      return;
    }
    if (!symbol) {
      errMsgHandler("Check the symbol");
      return;
    }

    authCtx.order(orderType, symbol, quantity, price);
  };

  const dropdownChangeHandler = (event) => {
    setOrderType(event.target.value);
  };

  const errMsgHandler = (text = "Something went wrong") => {
    setErrMsg(text);
    setTimeout(() => {
      setErrMsg("");
    }, 5000);
  };

  return (
    <form onSubmit={submitHandler} className={classes.orderForm}>
      <Typography>
        {`You currently have ${maxQuantity} ${symbol} stocks`}
        <br />
      </Typography>
      <Typography>
        {`Average buy price: $${averageBuyPrice(
          currentPortfolio,
          symbol
        ).toFixed(2)}`}
      </Typography>
      <Typography>
        <Dropdown
          label="Order Type:"
          options={dropdownOptions}
          value={orderType}
          onChange={dropdownChangeHandler}
        />
      </Typography>
      <Typography>
        Order quantity:{" "}
        <input
          name="orderQuantity"
          value={quantity}
          type="number"
          step="1"
          min="1"
          max="10000"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
      </Typography>
      <div className={classes.cards}>
        {/* <Button title=" - " value="-" onClick={quantityChangeHandler} /> */}
        <IconButton
          color="primary"
          title="-"
          value="-"
          onClick={quantityChangeHandler}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          color="primary"
          title="+"
          value="+"
          onClick={quantityChangeHandler}
        >
          <AddIcon />
        </IconButton>
        {/* <Button title=" + " value="+" onClick={quantityChangeHandler} /> */}
        {orderType === "sell" ? (
          <Button title="Max" value="Max" onClick={quantityChangeHandler}>
            Max
          </Button>
        ) : (
          ""
        )}
      </div>
      <Typography>
        Order value: ${orderValue}
        {errMsg ? <p className={classes.error}>{errMsg}</p> : ""}
      </Typography>
      <Typography>
        {!loadingOrder && !orderSuccess ? (
          // <Button title="Confirm" onClick={submitHandler} />
          <Button
            style={{ textTransform: "none" }}
            size="small"
            variant="outlined"
            // endIcon={<LogoutIcon />}
            onClick={submitHandler}
          >
            Confirm
          </Button>
        ) : orderSuccess ? (
          <p className={classes.success}>Order completed successfully </p>
        ) : (
          <LoadingSpinner />
        )}
      </Typography>
    </form>
  );
};

const maxStocksQuantity = (portfolio, symbol) => {
  const currentStock = portfolio.find((stock) => stock.symbol === symbol);
  if (currentStock) return currentStock.quantity;
  return 0;
};

const averageBuyPrice = (portfolio, symbol) => {
  const currentStock = portfolio.find((stock) => stock.symbol === symbol);
  if (currentStock) return currentStock.price;
  return 0;
};

export default TradeForm;
