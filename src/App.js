import './App.css';
import {Route, Switch,BrowserRouter, Redirect } from 'react-router-dom';
import VaccineRegistration from './containers/VaccineRegistration/VaccineRegistration.jsx';
import VaccineRegistrationListing from './containers/VaccineRegistration/ListVaccinationBooking.jsx';
import EditVaccineRegistration from './containers/VaccineRegistration/EditVaccinationBooking.jsx';
import { NavBar } from './containers/Nav/index.jsx';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function App() {  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Redirect to="/new" />
              </Route>
              <Route path="/new">
                <VaccineRegistration/>
              </Route>
              <Route path="/bookings/:bookingId">
                <EditVaccineRegistration/>
              </Route>
              <Route path="/bookings">
                <VaccineRegistrationListing/>
              </Route>
              
            </Switch>
        </BrowserRouter>
      </LocalizationProvider>
    )
}

