import React, { useState } from "react";
import Button from "../Button.jsx";
import InterviewerList from "../InterviewerList.jsx";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;
  
  // RRESETTING INPUTS
  // const reset = () => {
  //   return setName("") && setInterviewer(null);
  // }

  // const cancel = (reset, {onCancel}) 
  const reset = () => setName("") && setInterviewer(null);
  const cancel = () => reset(onCancel());

    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form onSubmit={event => event.preventDefault()} autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter Student Name"
            />
          </form>
          <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
            </section>
            <section className="appointment__card-right">
              <section className="appointment__actions">
                <Button danger onClick={cancel}>Cancel</Button>
                <Button confirm onClick={(event) => onSave(name, interviewer)}>Save</Button>
              </section>
            </section>
      </main>
    )
}