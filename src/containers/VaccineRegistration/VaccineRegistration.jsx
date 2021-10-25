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
import axios from "axios";
import { useEffect } from "react";

// const getVaccineCenter = () => {
//   return [
//     { name: "None", id: 0 },
//     { name: "Bukit Batok CC", id: 1 },
//     { name: "Bukit Panjang CC", id: 2 },
//     { name: "Bukit Timah CC", id: 3 },
//     { name: "Outram Park Polyclinic", id: 4 },
//   ];
// };

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

export default function VaccineRegistration() {
  const [allCentres, setAllCentres] = useState([]);
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [centre, setCentre] = useState(0);
  const [date, setDate] = useState(new Date());
  const [timeslotsArr, setTimeslotsArr] = useState([]);
  const [chosenSlot, setchosenSlot] = useState("");

  useEffect(() => {
    axios
      .get(BACKEND_URL + "/centres")
      .then((result) => {
        setAllCentres(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // also get the list of timeslots for that date
    axios
      .get(BACKEND_URL + `/centres/${centre}/12345`)
      .then((result) => {
        setTimeslotsArr(result.data);
      })
      .catch((error) => console.log(error));
  }, [date, centre]);

  // functions to add
  const handleNameChange = (event) => {
    const inputName = event.target.value;
    setName(inputName);
  };
  const handleNricChange = (event) => {
    const inputNric = event.target.value;
    setNric(inputNric);
  };
  const handleCentreChange = (event) => {
    const selectedCentre = event.target.value;
    setCentre(selectedCentre);
  };
  const handleDateChange = (newVal) => {
    setDate(newVal);
  };
  const handleSlotChange = (event) => {
    const selectedSlot = event.target.value;
    setchosenSlot(selectedSlot);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // postBooking(name, nric, centre, date);
    axios
      .post(BACKEND_URL + "/bookings/create", {
        fullName: name,
        nric,
        centreId: centre,
        time: date,
      })
      .then((result) => {
        console.log("posted!");
        console.log(result);
      })
      .catch((error) => console.log(error));
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
            value={name}
            onChange={handleNameChange}
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
            value={nric}
            onChange={handleNricChange}
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
            Register!
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
