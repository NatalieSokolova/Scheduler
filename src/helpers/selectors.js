export function getAppointmentsForDay(state, day) {
  // returns the value of the first element in the provided array that satisfies the provided testing function
  const selectedDayObj = state.days.find(selectedDay => selectedDay.name === day);
  const appointmentsForDay = [];

  if (!selectedDayObj) {
    //if there are no appointments on the given day, our days data is empty.
    return [];
  } else {

    //console.log("selectedDayObj.appointments: ", selectedDayObj.appointments)
   
    // iterate over selectedDayObj.appointments
    // check if selectedDayObj.appointments id matches state.appointments keys
    // push appointment obj into appointmentsForDay
    // return appointmentsForDay
    
    // state.appointments keys returns arr of strings
    const stateAppKeys = Object.keys(state.appointments)
    // converts strings to num and iterates
    const stateAppKeyNums = stateAppKeys.map(Number)
    //console.log("stateAppKeyNums: ", stateAppKeyNums)


    for (const id of selectedDayObj.appointments) {
      if (stateAppKeyNums.includes(id)) {

        // if match => add appointment object to arr
        appointmentsForDay.push(state.appointments[id.toString()])
      }
    }

  }
  return appointmentsForDay;
}


export function getInterviewersForDay(state, day) {
  const selectedDayObj = state.days.find(selectedDay => selectedDay.name === day);
  const interviewersForDay = [];

  //if there are no appointments on the given day, our days data is empty.
  if (!selectedDayObj) {
    return [];
  } else {
    const stateAppKeys = Object.keys(state.appointments)
    // converts strings to num and iterates
    const stateAppKeyNums = stateAppKeys.map(Number)

    for (const id of selectedDayObj.appointments) {
      // console.log("selectedDayObj: ", selectedDayObj)
      // console.log("selectedDayObj.appointments:",  selectedDayObj.appointments)

      //check if if interview obj is not null and includes id of selectedDayObj.appointments
      if (state.appointments[id.toString()].interview && stateAppKeyNums.includes(id)) {

        // console.log("state.appointments.id.interview: ", state.appointments[id.toString()].interview)
        // console.log("state.appointments.id.interview.interviewer: ", state.appointments[id.toString()].interview.interviewer)

        // console.log("stateAppKeyNums: ", stateAppKeyNums)
        // console.log("id: ", id)
        // console.log("state.interviewers[id]: ", state.interviewers[id])

        const interviewerId = state.appointments[id.toString()].interview.interviewer

        interviewersForDay.push(state.interviewers[interviewerId.toString()])

      }
    }

  }
  console.log("interviewersForDay: ", interviewersForDay)
  return interviewersForDay;
}




export function getInterview(state, interview) {

  const interviewObj = {};

  if (!interview) {
    return null;
  } else {

    for (const id in state.interviewers) {
      //console.log('state.interviewers: ', state.interviewers )
      if (Number(id) === interview.interviewer) {
        //console.log("interview.interviewer: ", interview.interviewer)
        interviewObj.student = interview.student;
        interviewObj.interviewer = state.interviewers[id];
      }
    }
  }

  return interviewObj;
};