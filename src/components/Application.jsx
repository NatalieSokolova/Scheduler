import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.jsx";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Maria Bogalle",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" ,
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Stephanie Colbert",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" ,
      }
    }
  },
  {
    id: 6,
    time: "5pm",
  },
];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  console.log("state.day: ", state.day)
  useEffect(() => {
    console.log("Getting list of days");

    // axios.get("/api/days")
    // .then((response) => {
    //   //setDays(response.data)
    // })

    const dayReq = axios.get("/api/days")

    const appointmentsReq = axios.get("/api/appointments")

    Promise.all([
      Promise.resolve(dayReq), 
      Promise.resolve(appointmentsReq)
      ])
      .then((all) => {
        console.log("all: ", all)
        
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
      })

      .catch(err => console.log(err))

      }, [])

  const parsedAppointment = appointments.map(appointment => 
     <Appointment key={appointment.id} {...appointment}/>)
   
     //const setDays = days => setState(state => ({...state, days}))

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
