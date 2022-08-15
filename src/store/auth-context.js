import React, { useState } from "react";
const BASE_URL = "https://simple-trade-israel-dev.herokuapp.com";

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  userData: {},
  loadUserData: () => {},
  portfolio: [],
  loadPortfolio: () => {},
  trading: {}, //{status:boolean, symbol:string}
  leaderboard: [],
  loadLeaderboard: () => {},
  checkToken: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
  loadTradeScreen: () => {},
  error: false,
  errorMsg: "",
  toggleError: () => {},
  order: () => {},
  loadingOrder: false,
  graphLoaded: false,
  loadGraph: () => {},
  graphData: {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); //CHANGE TO FALSE
  const [email, setEmail] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userData, setUserData] = useState();
  const [trading, setTrading] = useState({ status: false, symbol: "" });
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [graphData, setGraphData] = useState({ price: [], time: [] });

  const portfolioHandler = (userPortfolio) => {
    setPortfolio(userPortfolio.stocks);
  };

  const loginHandler = async (email, pw) => {
    const url = `${BASE_URL}${"/users/login"}`;
    errorHandler("clear");

    const dataToSend = {
      email: email,
      password: pw,
    };

    const dataToSendJSON = JSON.stringify(dataToSend);

    try {
      const response = await fetch(url, {
        method: "POST",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataToSendJSON,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(true);
        setErrorMsg(data.error);
        return;
      }
      setToken(data.token);
      setIsLoggedIn(true);
      setEmail(data.user.email);
      userDataUpdate(data.user);
      portfolioHandler(data.portfolio);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(true);
      return;
    }
  };

  const logoutHandler = async () => {
    const URLextension = "/users/logout";
    const url = `${BASE_URL}${URLextension}`;

    try {
      await fetch(url, {
        method: "POST",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setToken("");
    } catch (err) {
      setToken("");
    }
    setIsLoggedIn(false);
    setEmail("");
    setPortfolio([]);
    setUserData();
    setLeaderboard([]);
    setTrading({ status: false, symbol: "" });
    localStorage.removeItem("token");
  };

  const signupHandler = async (email, name, pw) => {
    errorHandler("clear");

    const url = `${BASE_URL}${"/users"}`;
    const dataToSend = {
      username: name,
      email: email,
      password: pw,
    };

    const dataToSendJSON = JSON.stringify(dataToSend);

    try {
      const response = await fetch(url, {
        method: "POST",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataToSendJSON,
      });

      const data = await response.json();
      if (!response.ok) {
        setError(true);
        setErrorMsg(data.error);
        return;
      }

      setToken(data.token);
      setIsLoggedIn(true);
      setEmail(data.user.email);
      userDataUpdate(data.user);
    } catch (err) {
      return;
    }
  };

  const userDataUpdate = (user) => {
    setUserData({
      name: user.username,
      balance: user.available_cash,
    });
  };

  const tradeHandler = (symbol) => {
    symbol = symbol.toUpperCase();
    if (symbol === "BACK") {
      setTrading({ status: false, symbol: "" });
      return;
    }
    if (symbol === "trade") {
      setTrading({ status: true, symbol: "" });
      return;
    }
    setTrading({ status: true, symbol: symbol });
  };

  const leaderboardHandler = async () => {
    const URLextension = "/portfolio?sortBy=interest:desc";
    const url = `${BASE_URL}${URLextension}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLeaderboard([...data]);
    } catch (err) {
      return;
    }
  };

  const errorHandler = (msg = null) => {
    // console.log(msg);
    if (msg === "clear") {
      setErrorMsg("");
      setError(false);
      return;
    }
    const current = error;
    if (current) {
      setErrorMsg("");
    }
    if (msg) {
      setErrorMsg(msg);
    }
    setError(!current);
  };

  const orderHandler = async (type, symbol, quantity, price) => {
    setLoadingOrder(true);

    const URLextension = type === "buy" ? "/portfolio/buy" : "/portfolio/sell";
    const url = `${BASE_URL}${URLextension}`;

    const dataToSendJSON = JSON.stringify({
      symbol,
      quantity: +quantity,
      price: +price,
    });

    try {
      const response = await fetch(url, {
        method: "PATCH",
        // mode: "cors",
        body: dataToSendJSON,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setPortfolio(data.portfolio.stocks);
      userDataUpdate(data.user);
    } catch (err) {
      return;
    }
    setLoadingOrder(false);
  };

  const loadGraphHandler = async (symbol, range = "INTRADAY") => {
    setGraphLoaded(false);
    const URLextension = `/portfolio/data?symbol=${symbol}&range=${range}`;
    const url = `${BASE_URL}${URLextension}`;

    try {
      const response = await fetch(url, {
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      let timeFixed;
      if (range === "INTRADAY") {
        timeFixed = data.data.time.map((el) => el.slice(11));
      } else {
        timeFixed = data.data.time;
      }
      setGraphData({
        price: data.data.price.reverse(),
        time: timeFixed.reverse(),
      });
      setGraphLoaded(true);
    } catch (err) {
      return;
    }
  };

  const checkTokenHandler = async (token) => {
    const url = `${BASE_URL}${"/users/refresh"}`;

    const dataToSend = {
      token: token,
    };

    const dataToSendJSON = JSON.stringify(dataToSend);

    try {
      const response = await fetch(url, {
        method: "POST",
        // mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: dataToSendJSON,
      });

      const data = await response.json();
      if (!response.ok || data?.error) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        return;
      }
      setToken(token);
      setIsLoggedIn(true);
      setEmail(data.user.email);
      userDataUpdate(data.user);
      portfolioHandler(data.portfolio);
    } catch (err) {
      setError(true);
      localStorage.removeItem("token");
      return;
    }
  };

  const contexValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    email: email,
    // password: password,
    portfolio: portfolio,
    checkToken: checkTokenHandler,
    login: loginHandler,
    logout: logoutHandler,
    loadPortfolio: portfolioHandler,
    loadUserData: userDataUpdate,
    loadTradeScreen: tradeHandler,
    userData: userData,
    trading: trading,
    leaderboard: leaderboard,
    loadLeaderboard: leaderboardHandler,
    signup: signupHandler,
    error: error,
    errorMsg: errorMsg,
    toggleError: errorHandler,
    order: orderHandler,
    loadingOrder: loadingOrder,
    graphLoaded: graphLoaded,
    loadGraph: loadGraphHandler,
    graphData: graphData,
  };

  return (
    <AuthContext.Provider value={contexValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
