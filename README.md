# Vaccination Appointment Booking App

A simple reservation app created with Node.js, Express, React, and postgresql.

[https://getvaxxed.netlify.app/](https://demo-vaccine-center.netlify.app/)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Features](#Features)
- [Assumptions](#Assumptions)
- [Design](#Design)

## General info

This project was a 2-day sprint.

## Technologies

#### Frontend

This project was bootstrapped with:

- [Create React App](https://github.com/facebook/create-react-app).
- [Material UI](https://mui.com/)

A boilerplate template was used from [here](https://github.com/homageapp/vaccination-center/tree/main/frontend)

#### Backend

- Node/ JavaScript
- Express
- PostgreSQL

## Features

- A person can make a booking, choosing a vaccination centre and date/time slot of his choice
- CRUD operations on slot reservation - can make booking, view booking, update booking, and delete booking
- At this moment cannot handle resource double reservation. A user can make multiple bookings
- Shows availability for each time slot at registration.

## Assumptions

1. Ignore nurse supply and duty schedule; will not define center capacity.
2. Centre capacity will be defined by its `start_time`, `end_time`, and `slot_capacity`
3. Each `slot` is 15 min long. There are no lunch breaks; `slot_capacity` is constant throughout the day.

## Design

- Backend is designed to be RESTful
- Backend set up follows MVC model
- Frontend is lacking in state management. Can be improved.
