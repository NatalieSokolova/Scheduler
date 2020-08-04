import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewClass = classNames({
    "interview-list__item": props.name,
    "interview-list__item--selected": props.selected
  })

  // const dayClass = classNames({
  //   "day-list__item": props.name,
  //   "day-list__item--selected": props.selected,
  //   "day-list__item--full": (props.spots === 0)
  // })

  return (
    <li className="interviewers__item">
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  Sylvia Palmer
</li>
  )
}