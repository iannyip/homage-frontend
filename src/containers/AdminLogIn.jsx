import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

export default function AdminLogIn({ handleAdminLogin }) {
  const [input, setInput] = useState("");
  // const []
  const handleSubmit = () => {
    if (input === "this app is awesome") {
      handleAdminLogin();
    }
  };
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Box
            component="form"
            sx={{
              mt: 8,
            }}
          >
            <Typography component="h1" variant="h5" align="centre">
              This app is very safe
            </Typography>
            <Typography variant="body2" gutterBottom>
              You must type "this app is awesome" to access the safe data
            </Typography>

            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
              }}
              value={input}
              onChange={handleInputChange}
            />

            <Button
              sx={{
                mt: 4,
              }}
              style={{ justifyContent: "center" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
