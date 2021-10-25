import {
  Container,
  Box,
  Button,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

// function getVaccineCenter() {
//   return [
//     { name: "None", id: 0 },
//     { name: "Bukit Batok CC", id: 1 },
//     { name: "Bukit Panjang CC", id: 2 },
//     { name: "Bukit Timah CC", id: 3 },
//     { name: "Outram Park Polyclinic", id: 4 },
//   ];
// }

function getBooking() {
  return {
    id: 1,
    name: "Tan Ah Kow",
    centerName: "Bukit Timah CC",
    centerId: 3,
    startTime: new Date("2021-12-01T09:00:00"),
  };
}

export default function EditVaccineRegistration() {
  const { bookingId } = useParams(); // to fix
  const centreList = [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
  const [allCentres, setAllCentres] = useState([]);
  const [name, setName] = useState(getBooking().name);
  const [nric, setNric] = useState(getBooking().name);
  const [centre, setCentre] = useState(getBooking().centerId);
  const [date, setDate] = useState(getBooking().startTime);
  const [timeslotsArr, setTimeslotsArr] = useState([]);
  const [chosenSlot, setchosenSlot] = useState("");

  // Get list of centres when component initializes
  useEffect(() => {
    axios
      .get(BACKEND_URL + "/centres")
      .then((result) => {
        setAllCentres(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Get list of timeslots each time centre or date field is changed
  useEffect(() => {
    // also get the list of timeslots for that date
    console.log("getting slots!");
    axios
      .get(BACKEND_URL + `/centres/${centre}/12345`)
      .then((result) => {
        setTimeslotsArr(result.data);
      })
      .catch((error) => console.log(error));
  }, [date, centre]);

  // Get the existing booking
  useEffect(() => {
    axios
      .get(BACKEND_URL + "/bookings/" + bookingId, { id: bookingId })
      .then((result) => {
        const bookingData = result.data;
        setNric(bookingData.person.nric);
        setName(bookingData.person.fullName);
        setCentre(bookingData.centreId);
        setDate(bookingData.date);
        setchosenSlot(bookingData.time.substr(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // change handlers
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleNricChange = (event) => {
    setNric(event.target.value);
  };
  const handleCentreChange = (event) => {
    setCentre(event.target.value);
  };
  const handleDateChange = (newVal) => {
    setDate(newVal);
  };
  const handleSlotChange = (event) => {
    setchosenSlot(event.target.value);
  };
  const handleSubmit = () => {
    console.log(`name: ${name}`);
    console.log(`nric: ${nric}`);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box
          component="form"
          sx={{
            mt: 8,
          }}
        >
          {/* TITLE */}
          <Typography component="h1" variant="h5">
            Book a slot
          </Typography>
          {/* NRIC FIELD */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="nric"
            label="NRIC Number"
            name="NRIC"
            autoComplete="nric"
            sx={{ mb: 2 }}
            autoFocus
            value={nric}
            onChange={handleNricChange}
          />
          {/* FULL NAME FIELD */}
          <TextField
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            sx={{ mb: 2 }}
            value={name}
            onChange={handleNameChange}
          />
          {/* VACCINE CENTER DROPDOWN */}
          <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
          <Select
            labelId="vaccineCenterLabel"
            label="Vaccine Center"
            required
            fullWidth
            id="vaccineCenter"
            value={centre}
            defaultValue=""
            onChange={handleCentreChange}
            sx={{ mb: 2 }}
          >
            {allCentres.map((v) => {
              return (
                <MenuItem key={v.id} value={v.id}>
                  {v.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* DATE SELECTION */}
          <DatePicker
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
            label="Date"
            value={date}
            onChange={handleDateChange}
            required
          />
          {/* SLOT SELECTION */}
          <InputLabel id="timeslotLabel">Time Slot</InputLabel>
          <Select
            labelId="timeslotLabel"
            label="Timeslot"
            required
            fullWidth
            id="timeslot"
            value={chosenSlot}
            defaultValue=""
            onChange={handleSlotChange}
            sx={{ mb: 2 }}
          >
            {timeslotsArr.map((v) => {
              return (
                <MenuItem key={v.time} value={v.time}>
                  {v.time}
                </MenuItem>
              );
            })}
          </Select>
          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Update!
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
