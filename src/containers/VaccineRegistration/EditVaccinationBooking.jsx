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

export default function EditVaccineRegistration() {
  const { bookingId } = useParams();
  const [allCentres, setAllCentres] = useState([]);
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [centre, setCentre] = useState("");
  const [date, setDate] = useState(new Date());
  const [timeslotsArr, setTimeslotsArr] = useState([]);
  const [chosenSlot, setchosenSlot] = useState("");
  const [tempSlot, setTempSlot] = useState("");
  const [personId, setPersonId] = useState("");

  // Get list of centres when component initializes
  useEffect(() => {
    axios
      .get(BACKEND_URL + "/centres")
      .then((result) => {
        setAllCentres(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  // Get list of timeslots for centre
  useEffect(() => {
    if (centre > 0) {
      axios
        .get(BACKEND_URL + `/centres/${centre}/12345`)
        .then((result) => {
          setTimeslotsArr(result.data);
          setchosenSlot(tempSlot);
        })
        .catch((error) => console.log(error));
    }
  }, [tempSlot]);

  // Get list of timeslots each time centre or date field is changed
  useEffect(() => {
    // also get the list of timeslots for that date
    console.log("getting slots!");
    if (centre > 0) {
      axios
        .get(BACKEND_URL + `/centres/${centre}/12345`)
        .then((result) => {
          setTimeslotsArr(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [date, centre]);

  // Get the existing booking
  useEffect(() => {
    axios
      .get(BACKEND_URL + "/bookings/" + bookingId, { id: bookingId })
      .then((result) => {
        const bookingData = result.data;
        setNric(bookingData.person.nric);
        setName(bookingData.person.fullName);
        setPersonId(bookingData.person.id);
        setCentre(bookingData.centreId);
        setDate(bookingData.date);
        setTempSlot(bookingData.time.substr(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookingId]);

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
  const handleUpdate = () => {
    console.log(`name: ${name}`);
    console.log(`nric: ${nric}`);
    axios
      .put(`${BACKEND_URL}/bookings/${bookingId}/edit`, {
        name,
        nric,
        personId,
        centre,
        date,
        chosenSlot,
        bookingId,
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            Update Booking
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
            onClick={handleUpdate}
          >
            Update!
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
