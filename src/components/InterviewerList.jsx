import React from"react";

import InterviewerListItem from "components/InterviewerListItem.jsx";

import "components/InterviewerListItem.scss";

export default function InterviewList(props) {
  // const { interviewers, interviewer, setInterviewer } = props;

  const parsedInterviewers = props.interviewers.map(interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      //name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />)
  return (
  
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      { parsedInterviewers }
    </ul>
    </section>
    
  )
}