export function getAppointmentsForDay(state, day) {
  // returns the value of the first element in the provided array that satisfies the provided testing function
  const selectedDayObj = state.days.find(selectedDay => selectedDay.name === day);
  const appointmentsForDay = [];

  // selectedDayObj =  {
  //   id: 1,
  //   name: "Monday",
  //   appointments: [1, 2, 3]
  // }



  if (!selectedDayObj) {
    //if there are no appointments on the given day, our days data is empty.
    return [];
  } else {

    console.log("selectedDayObj.appointments: ", selectedDayObj.appointments)
   
    // iterate over selectedDayObj.appointments
    // chack if selectedDayObj.appointments id matches state.appointments keys
    // push appointment obj into appointmentsForDay
    // return appointmentsForDay
    
    // state.appointments keys returns arr of strings
    const stateAppKeys = Object.keys(state.appointments)
    // converts strings to num
    const stateAppKeyNums = stateAppKeys.map(Number)
    console.log("stateAppKeyNums: ", stateAppKeyNums)


    for (const id of selectedDayObj.appointments) {
      if (stateAppKeyNums.includes(id)) {

        // if match => add appointment object to arr
        appointmentsForDay.push(state.appointments[id.toString()])
      }
    }

  }
  return appointmentsForDay;
}