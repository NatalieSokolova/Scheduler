import React from"react";

import InterviewerListItem from "components/InterviewerListItem.jsx";

import "components/InterviewerList.scss";

export default function InterviewList(props) {
  // const { interviewers, interviewer, setInterviewer } = props;

  const interviewers = props.interviewers.map(interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
    />)
  return (
  
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      { interviewers }
    </ul>
    </section>
    
  )
}