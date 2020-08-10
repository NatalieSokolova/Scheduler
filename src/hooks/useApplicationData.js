import { useState, useEffect } from "react";
import axios from "axios";

export default function() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {
    "1": {
    id: 1,
    time: "12pm",
    interview: null
  }
},
  interviewer: {}
});

// adds interview to db
const bookInterview = (id, interview) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  //reduces number of spots after booking
  if (appointment.id) {
    console.log("state:", state)
    const selectedDay = state.days.find(day => day.appointments.includes(appointment.id))
    const spots = selectedDay.spots--
    setState(prev => ({ ...state, appointments, spots }));
  }


  // to make sure saved data remains after browser is refreshed
  return axios.put(`/api/appointments/${id}`,{ id, interview })
  .then(response => {
    setState({ ...state, appointments });
  })
  .catch(err => console.log(err))
}

// removes interview from db
const cancelInterview = (id) => {
 
  for (const appointment in  state.appointments) {
    if (state.appointments[appointment].id === id) {
      //const selectedAppointment = state.appointments[appointment].interview

       // increases number of spots after cancellation
      const selectedDay = state.days.find(day => day.appointments.includes(id))
      const spots = selectedDay.spots++
      setState(prev => ({ ...state, spots }));
    }
  }

  return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      setState(prev => ({ ...state, selectedAppointment: null }));
    })
    .catch(err => console.log(err))
}

//NOTE TO SELF:
// refactor changeSpotsNumber to use ternary operator if bookInterview or cancelInterview is called???


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
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } 
}
