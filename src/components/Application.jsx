import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.jsx";
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "../helpers/selectors"
import {getInterview} from "../helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: {}
  });

  const setDay = day => setState({ ...state, day });
  console.log("state.day: ", state.day)
  useEffect(() => {
    console.log("Getting list of days");

    const dayReq = axios.get("/api/days")
    const appointmentsReq = axios.get("/api/appointments")
    const interviewersReq = axios.get("/api/interviewers")


    Promise.all([
      Promise.resolve(dayReq), 
      Promise.resolve(appointmentsReq),
      Promise.resolve(interviewersReq),
      ])
      .then((all) => {
        console.log("all: ", all)
        console.log("interviewers: ", all[2].data)

        // ...prev => we are changing only specified states and the rest remain the same
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })

      .catch(err => console.log(err))

      }, [])
    
    const appointmentList = getAppointmentsForDay(state, state.day)
    const parsedAppointment = appointmentList.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        />
      )
    })

      return (
         <main className="layout">
           <section className="sidebar">
           <img
             className="sidebar--centered"
             src="images/logo.png"
             alt="Interview Scheduler"
           />
           <hr className="sidebar__separator sidebar--centered" />
           <nav className="sidebar__menu">
           <DayList
             days={state.days}
             day={state.day}
             setDay={setDay}
           />
           </nav>
           <img
             className="sidebar__lhl sidebar--centered"
             src="images/lhl.png"
             alt="Lighthouse Labs"
           />
           </section>
           <section className="schedule">  
           {parsedAppointment}
           </section>
         </main>
       );
 }