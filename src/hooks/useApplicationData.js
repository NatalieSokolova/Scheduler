import { useState, useEffect } from "react";
import axios from "axios";

export default function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null,
      },
    },
    interviewer: {},
  });

  // adds interview to db
  const bookInterview = (id, interview) => {
    // to make sure saved data remains after browser is refreshed
    return axios
      .put(`/api/appointments/${id}`, { id, interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        // checks to see if appointment doesn't already exists
        if (state.appointments[id].interview === null) {
          //reduces number of spots after booking
          if (appointment.id) {
            const selectedDay = state.days.find((day) =>
              day.appointments.includes(appointment.id)
            );
            const spots = selectedDay.spots--;
            setState((prev) => ({ ...state, appointments, spots }));
          }
        }
        setState({ ...state, appointments });
      });
  };

  // removes interview from db
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const selectedDay = state.days.find((day) =>
        day.appointments.includes(id)
      );
      selectedDay.spots++;
      setState((prev) => ({ ...state, selectedAppointment: null }));
    });
  };

  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    const dayReq = axios.get("/api/days");
    const appointmentsReq = axios.get("/api/appointments");
    const interviewersReq = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(dayReq),
      Promise.resolve(appointmentsReq),
      Promise.resolve(interviewersReq),
    ])
      .then((all) => {
        // ...prev => we are changing only specified states and the rest remain the same
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })

      .catch((err) => console.log(err));
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
