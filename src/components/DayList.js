import React from "react";

//import ReactDOM from "react-dom";

import DayListItem from "components/DayListItem.js";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    );
  });

  return days;
}

// ReactDOM.render(
//   <DayList days={days} />,
//   document.getElementById("root")
// );
