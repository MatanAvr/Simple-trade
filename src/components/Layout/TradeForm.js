import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./TradeForm.module.css";
// import Dropdown from "../UI/Dropdown";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import Button from "../UI/Button";
import Button from "@mui/material/Button";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ButtonGroup from "@mui/material/ButtonGroup";

// const dropdownOptions = [
//   { label: "Buy", value: "buy" },
//   { label: "Sell", value: "sell" },
// ];

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
        {`Average buy price: $${averageBuyPrice(
          currentPortfolio,
          symbol
        ).toFixed(2)}`}
      </Typography>

      <Typography component={"span"}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Order type</InputLabel>
          <Select
            value={orderType}
            label="orderType"
            onChange={dropdownChangeHandler}
          >
            <MenuItem value={"buy"}>Buy</MenuItem>
            <MenuItem value={"sell"}>Sell</MenuItem>
          </Select>
        </FormControl>
      </Typography>

      <Typography component="span">
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
        <ButtonGroup size="small" sx={{ height: "25px", marginTop: "10px" }}>
          <Button
            color="primary"
            size="small"
            value="-"
            onClick={quantityChangeHandler}
          >
            <RemoveIcon />
          </Button>
          <Button
            color="primary"
            size="small"
            value="+"
            onClick={quantityChangeHandler}
          >
            <AddIcon />
          </Button>
          {orderType === "sell" ? (
            <Button size="small" value="Max" onClick={quantityChangeHandler}>
              Max
            </Button>
          ) : (
            ""
          )}
        </ButtonGroup>
      </Typography>
      <Typography>
        Order value: ${orderValue}
        {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
      </Typography>
      <Typography>
        {!orderSuccess ? ( //!loadingOrder &&
          <LoadingButton
            style={{ textTransform: "none" }}
            size="small"
            variant="outlined"
            loading={loadingOrder}
            onClick={submitHandler}
          >
            Confirm
          </LoadingButton>
        ) : (
          <Alert severity="success">Order completed successfully </Alert>
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
