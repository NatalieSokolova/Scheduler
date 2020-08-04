import React from"react";

import InterviewerListItem from "components/InterviewerListItem.jsx";

import "components/InterviewerListItem.scss";

export default function InterviewList() {
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list"></ul>
    </section>
  )
}

// import React from "react";

// import DayListItem from "components/DayListItem.jsx";

// export default function DayList(props) {
//   const parsedDays = props.days.map(day => {
//     return (
//       <DayListItem 
//         key={day.id}
//         name={day.name} 
//         spots={day.spots} 
//         selected={day.name === props.day}
//         setDay={props.setDay}  
//       />
//     );
//   });

//   return parsedDays;
// }