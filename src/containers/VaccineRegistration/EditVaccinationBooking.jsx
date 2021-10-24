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
import DateTimePicker from "@mui/lab/DateTimePicker";
import DatePicker from "@mui/lab/DatePicker";
import React, { useState } from "react";

function getVaccineCenter() {
  return [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];
}

function getBooking() {
  return {
    id: 1,
    name: "Tan Ah Kow",
    centerName: "Bukit Timah CC",
    centerId: 3,
    startTime: new Date("2021-12-01T09:00:00"),
  };
}

export default function VaccineRegistration() {
  const centreList = [
    { name: "None", id: 0 },
    { name: "Bukit Batok CC", id: 1 },
    { name: "Bukit Panjang CC", id: 2 },
    { name: "Bukit Timah CC", id: 3 },
    { name: "Outram Park Polyclinic", id: 4 },
  ];

  const [name, setName] = useState(getBooking().name);
  const [nric, setNric] = useState(getBooking().name);
  const [centre, setCentre] = useState(getBooking().centerId);
  const [date, setDate] = useState(getBooking().startTime);

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

// export class EditVaccineRegistration extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedCenter: getBooking.apply().centerId,
//       date: getBooking.apply().startTime,
//     };
//     this.handleSelect = this.handleSelect.bind(this);
//     this.handleDateChange = this.handleDateChange.bind(this);
//   }
//   handleSelect(event) {
//     this.setState({ selectedCenter: event.target.value });
//   }
//   handleDateChange(value) {
//     const state = this.state;
//     this.setState({ ...state, date: value });
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <Container>
//           <Box
//             component="form"
//             sx={{
//               mt: 8,
//             }}
//           >
//             <Typography component="h1" variant="h5">
//               Book a slot
//             </Typography>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="nric"
//               label="NRIC Number"
//               name="NRIC"
//               autoComplete="nric"
//               value={getBooking().id}
//               sx={{mb: 2}}
//               autoFocus
//             />
//             <TextField
//               required
//               fullWidth
//               id="name"
//               label="Full Name"
//               value={getBooking().name}
//               sx={{mb: 2}}
//               name="name"
//               autoComplete="name"
//             />
//             <InputLabel id="vaccineCenterLabel">Vaccine Center</InputLabel>
//             <Select
//               labelId="vaccineCenterLabel"
//               label="Vaccine Center"
//               required
//               fullWidth
//               id="vaccineCenter"
//               value={this.state.selectedCenter}
//               onChange={this.handleSelect}
//               sx={{mb: 2}}
//             >
//               {getVaccineCenter().map((v) => {
//                 return (
//                   <MenuItem key={v.id} value={v.id}>
//                     {v.name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//             <DateTimePicker
//               renderInput={(props) => <TextField {...props} />}
//               label="Slot"
//               value={this.state.date}
//               onChange={this.handleDateChange}
//               required
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Register!
//             </Button>
//           </Box>
//         </Container>
//       </React.Fragment>
//     );
//   }
// }
