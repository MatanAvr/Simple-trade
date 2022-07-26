import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Search.module.css";
import searchIcon from "../img/search.png";
import Button from "./Button";
import stocksArr from "../../store/stocksArr";

const Search = (props) => {
  const authCtx = useContext(AuthContext);
  const [symbol, setSymbol] = useState("");
  const [stocksList, setStocksList] = useState("");

  useEffect(() => {});

  const updateStockList = (stockName) => {
    const rawList = stocksArr.filter(
      (element) => element.slice(0, stockName.length) === stockName
    );
    const newList = rawList.slice(0, 5);
    setStocksList(newList);
  };

  let timer;

  const changeHandler = (event) => {
    event.preventDefault();

    if (event.type === "submit") {
      authCtx.loadTradeScreen(symbol);
      return;
    }
    if (timer) clearTimeout(timer); //clear existing timer

    if (event.target.value.trim().length === 0) {
      setSymbol(event.target.value);
      return;
    }

    timer = setTimeout(() => {
      updateStockList(event.target.value.toUpperCase());
    }, 50);

    setSymbol(event.target.value);
  };

  return (
    <form
      className={classes.searchBar}
      onSubmit={changeHandler}
      autoComplete="off"
    >
      <input
        name="stocklist"
        list="stocks"
        type="text"
        minLength={1}
        maxLength={6}
        value={symbol}
        onChange={changeHandler}
      />
      <datalist id="stocks" className={classes.autofill}>
        {stocksList ? (
          stocksList.map((element) => (
            <option key={Math.random()} value={element} />
          ))
        ) : (
          <option value="EMPTY" />
        )}
      </datalist>

      <Button type="icon" onClick={authCtx.loadTradeScreen.bind(null, symbol)}>
        <img alt="Search" src={searchIcon} draggable="false" />
      </Button>
    </form>
  );
};

export default Search;
