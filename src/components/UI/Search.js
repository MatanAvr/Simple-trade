import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import stocksArr from "../../store/stocksArr";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const english = /^[A-Za-z]*$/;

const Search = (props) => {
  const authCtx = useContext(AuthContext);
  const [symbol, setSymbol] = useState("");
  const [stocksList, setStocksList] = useState([]);
  const [showModalOnce, setShowModalOnce] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const updateStockList = (stockName) => {
    const rawList = stocksArr.filter(
      (element) => element.slice(0, stockName.length) === stockName
    );
    const newList = rawList.slice(0, 5);
    setStocksList(newList);
  };

  let timer;

  const changeHandler = (event, value) => {
    setInputError(false);
    if (!english.test(value)) {
      setInputError(true);
      if (showModalOnce) {
        authCtx.toggleError("Valid characters: A-Z/a-z");
        setShowModalOnce(false);
      }
      return;
    }

    if (!value || value.trim().length === 0) {
      setSymbol(value);
      return;
    }

    if (
      value &&
      (event?.type === "submit" ||
        event?.type === "keydown" ||
        event?.type === "click")
    ) {
      authCtx.loadTradeScreen(value);
      setSymbol("");
      setInputValue("");
      setStocksList([]);
      return;
    }

    if (timer) clearTimeout(timer); //clear existing timer

    timer = setTimeout(() => {
      updateStockList(value?.toUpperCase());
    }, 50);

    setSymbol(value);
  };

  return (
    <>
      <Autocomplete
        size="small"
        id="stocksList"
        options={stocksList}
        sx={{ width: 250 }}
        value={symbol}
        inputValue={inputValue}
        autoComplete={true}
        autoSelect={true}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={(event, value) => {
          changeHandler(event, value);
        }}
        onInputChange={(event, value) => {
          setInputValue(value.toUpperCase());
          updateStockList(value.toUpperCase());
        }}
        renderInput={(stocksList) => (
          <TextField size="small" {...stocksList} label="Search for a stock" />
        )}
      />
    </>
  );
};

export default Search;
