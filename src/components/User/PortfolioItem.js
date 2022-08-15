// import React, { useContext } from "react";
// import AuthContext from "../../store/auth-context";
// import classes from "./PortfolioItem.module.css";
// import Button from "../UI/Button";
// import PortfolioWithUpdate from "./PortfolioWithUpdate";

// const PortfolioItem = (props) => {
//   const authCtx = useContext(AuthContext);
//   const portfolioData = props.portfolioData;

//   return (
//     <ul className={classes.ul}>
//       {portfolioData.map((item) => (
//         <li key={item._id}>
//           <PortfolioWithUpdate item={item} />
//           <Button
//             title="Trade"
//             onClick={authCtx.loadTradeScreen.bind(null, item.symbol)}
//           />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default PortfolioItem;
