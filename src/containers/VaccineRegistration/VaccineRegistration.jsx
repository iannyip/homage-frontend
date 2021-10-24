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

const getVaccineCenter = () => {
  return [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
};

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";
const postBooking = (fullName, nric, centreId, time) => {
  axios
    .post(BACKEND_URL + "/bookings/create", { fullName, nric, centreId, time })
    .then((result) => {
      console.log("posted!");
      console.log(result);
    })
    .catch((error) => console.log(error));
};

export default function VaccineRegistration() {
  console.log("i ran!");
  const centreList = [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];

  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [centre, setCentre] = useState(0);
  const [date, setDate] = useState(new Date());

  // functions to add
  const handleNameChange = (event) => {
    const inputName = event.target.value;
    console.log(`inputName: ${inputName}`);
    setName(inputName);
  };
  const handleNricChange = (event) => {
    const inputNric = event.target.value;
    console.log(`inputNric: ${inputNric}`);
    setNric(inputNric);
  };
  const handleCentreChange = (event) => {
    const selectedCentre = event.target.value;
    console.log(`selectedCentre: ${selectedCentre}`);
    setCentre(selectedCentre);
  };
  const handleDateChange = (newVal) => {
    console.log(newVal);
    setDate(newVal);
  };
  const handleSubmit = () => {
    console.log(`name: ${name}`);
    console.log(`nric: ${nric}`);
    postBooking(name, nric, centre, date);
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
            {centreList.map((v) => {
              return (
                <MenuItem key={v.id} value={v.id}>
                  {v.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* DATE TIME SELECTION */}
          <DatePicker
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
            label="Date"
            value={date}
            onChange={handleDateChange}
            required
          />
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
