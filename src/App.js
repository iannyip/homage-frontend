import './App.css';
import {Route, Switch,BrowserRouter, Redirect } from 'react-router-dom';
import VaccineRegistration from './containers/VaccineRegistration/VaccineRegistration.jsx';
import VaccineRegistrationListing from './containers/VaccineRegistration/ListVaccinationBooking.jsx';
import EditVaccineRegistration from './containers/VaccineRegistration/EditVaccinationBooking.jsx';
import { NavBar } from './containers/Nav/index.jsx';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AnimatedModal from './containers/ModalsMessages.jsx';
import React, { useState } from "react";

export default function App() {  
  const [submitModal, setSubmitModal] = useState(false);
  const submitModalHandler = () =>{
    setSubmitModal(!submitModal);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
          <NavBar />
          <AnimatedModal message={"success"} openModal = {submitModal} submitModalHandler = {submitModalHandler}/>
          <Switch>
            <Route path="/new">
              <VaccineRegistration submitModalHandler = {submitModalHandler}/>
            </Route>
            <Route path="/bookings/:bookingId">
              <EditVaccineRegistration/>
            </Route>
            <Route path="/bookings">
              <VaccineRegistrationListing/>
            </Route>
            {/* <Route path="/mybookings">
              <VaccineRegistrationListing/>
            </Route> */}
            <Route path="/">
              <Redirect to="/new" />
            </Route>
          </Switch>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

