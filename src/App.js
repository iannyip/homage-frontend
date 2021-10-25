import './App.css';
import {Route, Switch,BrowserRouter } from 'react-router-dom';
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
              <Route path="/new">
                <VaccineRegistration/>
              </Route>
              <Route path="/bookings/:bookingId">
                <h1>Hello</h1>
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

