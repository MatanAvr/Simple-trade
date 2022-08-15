import React, { useContext } from "react";
// import classes from "./LeaderboardItem.module.css";
import AuthContext from "../../store/auth-context";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
// import Avatar from "@mui/material/Avatar";
// import { yellow } from "@mui/material/colors";

const LeaderboardItem = (props) => {
  const authCtx = useContext(AuthContext);
  const leaderboardData = props.leaderboardData;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small">
        <TableBody>
          {leaderboardData.map((item, index) => {
            const pl = (item.interest * 100 - 100).toFixed(2);
            const color =
              index === 0
                ? "rgba(255,215,0,0.5)" //gold
                : index === 1
                ? "rgba(211,211,211,0.5)" //silver
                : index === 2
                ? "rgba(205, 114, 50,0.5)" //bronze
                : item.username === authCtx.userData.name
                ? "rgba(0,0,255,0.5)" //blue
                : "";
            //if current user => border is more visible
            const usernameShow =
              item.username === authCtx.userData.name ? (
                <b>{item.username}</b>
              ) : (
                item.username
              );
            return (
              <TableRow key={Math.random()} style={{ backgroundColor: color }}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{usernameShow}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${pl}%`}
                    size="small"
                    color={pl > 0 ? "success" : pl < 0 ? "error" : "info"}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardItem;
