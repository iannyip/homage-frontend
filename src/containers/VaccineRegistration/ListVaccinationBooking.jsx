import {
  Table,
  Box,
  Button,
  CssBaseline,
  Typography,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

export default function VaccineRegistrationListing() {
  const [allBookings, setAllBookings] = useState([]);
  const [reRender, setReRender] = useState(false);

  // Retrieve all data when view loads
  useEffect(() => {
    axios
      .get(BACKEND_URL + "/bookings")
      .then((result) => {
        console.log("got all bookings!");
        setAllBookings(result.data);
      })
      .catch((error) => console.log(error));
  }, [reRender]);

  const handleDelete = (bookingId) => {
    console.log(`going to delete ${bookingId}`);
    axios
      .delete(BACKEND_URL + "/bookings/" + bookingId + "/delete", {
        id: bookingId,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setReRender(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ mt: 8 }}>
          <Typography component="h1" variant="h5">
            Active Booking
          </Typography>
          <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Center Name</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBookings.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.person.fullName}
                    </TableCell>
                    <TableCell align="left">{row.centre.name}</TableCell>
                    <TableCell align="left">
                      {moment(row.date).format("d MMM YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {row.time.substring(0, 5)}
                    </TableCell>
                    <TableCell align="left">
                      <Button component={Link} to={`/bookings/${row.id}`}>
                        <ModeEditIcon />
                      </Button>
                      <Button
                        value="hello"
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </React.Fragment>
  );
}
