export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(selectedDay => selectedDay.name === day);
  const appointmentsForDay = [];

  if (!selectedDay) {
    //if there are no appointments on the given day, our days data is empty.
    return []
  } else {

    for (const id in appointments) {
      if (selectedDay.appointments.includes(appointments[Number(id)])) {
        appointmentsForDay.push(appointments[id])
      }
    }
  }
  return appointmentsForDay;
}