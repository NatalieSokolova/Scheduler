import React from "react";

import DayListItem from "components/DayListItem.jsx";

export default function DayList(props) {

  const parsedDays = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    );
  });

  return parsedDays;
}