import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Portfolio.module.css";
import PortfolioItemMUI from "./PortfolioItemMUI";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Portfolio = (props) => {
  const authCtx = useContext(AuthContext);
  const portfolioList = authCtx.portfolio;

  return (
    <div className={classes.portfolio}>
      <Typography variant="h6">Portfolio</Typography>
      {portfolioList.length === 0 ? (
        <>
          <Typography>
            Your portfolio is currently empty, look for a stock and start
            trading!
          </Typography>
          <br />
          <Button
            variant="outlined"
            style={{ textTransform: "none" }}
            size="small"
            onClick={authCtx.loadTradeScreen.bind(null, "")}
          >
            Start Trading
          </Button>
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} size="small">
            <TableHead>
              <TableRow
                key="portfolioTableHead"
                style={{ backgroundColor: "rgba(25,118,210,0.8)" }}
              >
                <TableCell>
                  <b>Symbol</b>
                </TableCell>
                <TableCell align="center">
                  <b>Quantity</b>
                </TableCell>
                <TableCell align="center">
                  <b>Average buy price</b>
                </TableCell>
                <TableCell align="center" sx={{ minWidth: "95px" }}>
                  <b>P/L</b>
                </TableCell>
                <TableCell align="center">
                  <b>Trade</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolioList.map((item, index) => (
                <PortfolioItemMUI
                  key={Math.random()}
                  item={item}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Portfolio;
