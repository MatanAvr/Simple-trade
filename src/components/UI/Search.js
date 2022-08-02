import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Search.module.css";
import searchIcon from "../img/search.png";
import Button from "./Button";
import stocksArr from "../../store/stocksArr";

const english = /^[A-Za-z]*$/;

const Search = (props) => {
  const authCtx = useContext(AuthContext);
  const [symbol, setSymbol] = useState("");
  const [stocksList, setStocksList] = useState("");
  const [showModalOnce, setShowModalOnce] = useState(true);
  const [inputError, setInputError] = useState(false);
  const showNote = props.showNote ? true : false;
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
    setInputError(false);
    if (!english.test(event.target.value)) {
      setInputError(true);
      if (showModalOnce) {
        authCtx.toggleError("Valid characters: A-Z/a-z");
        setShowModalOnce(false);
      }
      return;
    }

    // const checkIfClickedAutocomplete = (() => {
    //   console.log("inside");
    //   const options = document.getElementById("stocks").childNodes;
    //   for (let i = 0; i < options.length; i++) {
    //     if (options[i].value === event.target.value) {
    //       setTimeout(() => {
    //         setSymbol("");
    //       }, 50);

    //       console.log("inside2");

    //       // authCtx.loadTradeScreen(options[i].value);

    //       return;
    //     }
    //   }
    // })();

    if (event.type === "submit") {
      authCtx.loadTradeScreen(symbol);
      setSymbol("");
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
    <>
      <form
        className={classes.searchBar}
        onSubmit={changeHandler}
        autoComplete="off"
      >
        <input
          className={inputError ? classes.error : ""}
          name="stocklist"
          list="stocks"
          type="text"
          placeholder="Valid characters:A-Z/a-z"
          minLength={1}
          maxLength={6}
          value={symbol}
          onChange={changeHandler}
        />
        <datalist id="stocks">
          {
            stocksList
              ? stocksList.map((element) => (
                  <option
                    key={Math.random()}
                    value={element}
                    onClick={() => console.log("Clicked")}
                  />
                ))
              : ""
            // <option value="EMPTY" />
          }
        </datalist>

        <Button
          type="icon"
          onClick={authCtx.loadTradeScreen.bind(null, symbol)}
        >
          <img alt="Search" src={searchIcon} draggable="false" />
        </Button>
      </form>
      {showNote ? (
        <p className={classes.note}>Valid symbol characters: A-Z/a-z</p>
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
