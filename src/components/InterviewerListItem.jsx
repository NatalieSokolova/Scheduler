import React from "react";

import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames({
    "interviewers__item": props,
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(name)}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {name}
</li>
  )
}