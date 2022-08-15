// import React, { useContext } from "react";
// import AuthContext from "../../store/auth-context";
// import classes from "./Portfolio.module.css";
// import PortfolioItem from "./PortfolioItem";
// import Button from "../UI/Button";
// import { Typography } from "@mui/material";

// const Portfolio = (props) => {
//   const authCtx = useContext(AuthContext);
//   const portfolioList = authCtx.portfolio;

//   return (
//     <div className={classes.portfolio}>
//       <Typography variant="h6">
//         <u>Portfolio</u>
//       </Typography>
//       {portfolioList.length === 0 ? (
//         <>
//           <p>You'r portfolio is empty, start trading!</p>
//           <Button
//             title="Start Trading"
//             onClick={authCtx.loadTradeScreen.bind(null, "")}
//           />
//         </>
//       ) : (
//         <PortfolioItem portfolioData={portfolioList} />
//       )}
//     </div>
//   );
// };

// export default Portfolio;
