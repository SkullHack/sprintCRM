import React, { useEffect, useState, useRef } from "react";
import { useDispatch, Provider } from "react-redux";
import { useSelector } from "react-redux";
import { getTickets } from "../redux/actions/ticketAction";
import store from "../redux/store";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ChartTicket = () => {
  //seting styles for the table
  const ref = React.createRef();
  const ref2 = React.createRef();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.purple,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //getting ticket details using redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);
  const { ticket } = useSelector((state) => state.ticket);

  return (
    <div>
      {/* formating tickets data inside a table */}
      <center>
        <TableContainer
          component={Paper}
          style={{ marginTop: "8%", width: "70%", marginBotton: "10%" }}
        >
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{width:"40%"}}align="center">Ticket title</StyledTableCell>
                <StyledTableCell align="center">priority</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticket.map((tickets) => (
                <StyledTableRow key={tickets.ticketTitle}>
                  <StyledTableCell align="center">
                    {tickets.ticketTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tickets.priority}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tickets.ticketType}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <br></br>
        <br></br>
      </center>
    </div>
  );
};
const rootElement = document.getElementById("root");

export default ChartTicket;
