import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Portfolio.module.css";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import PortfolioItem from "./PortfolioItem";
import PortfolioItemMUI from "./PortfolioItemMUI";
// import Button from "../UI/Button";
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
      <Typography variant="h6">
        <u>Portfolio</u>
      </Typography>
      {portfolioList.length === 0 ? (
        <>
          <Typography>
            You'r portfolio is empty, look for a stock and start trading!
          </Typography>
          <Button
            title="Start Trading"
            onClick={authCtx.loadTradeScreen.bind(null, "")}
          />
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} size="small">
            <TableHead>
              <TableRow key="portfolioTableHead">
                <TableCell>Symbol</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Average buy price</TableCell>
                <TableCell align="center">P/L</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolioList.map((item) => (
                <PortfolioItemMUI item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Portfolio;
