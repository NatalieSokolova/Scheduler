import React, { useState } from "react";
import Button from "../Button.jsx";
import InterviewerList from "../InterviewerList.jsx";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;
  
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  const cancel = () => reset(onCancel());

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(name, interviewer);
  }

    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form onSubmit={event => event.preventDefault()} autoComplete="off">
            <input 
              className="appointment__create-input text--semi-bold"
              name={name}
              value={name}
              onChange={event => setName(event.target.value)}
              type="text"
              placeholder="Enter Student Name"
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList 
          interviewers={interviewers} 
          value={interviewer} 
          onChange={setInterviewer} />
            </section>
            <section className="appointment__card-right">
              <section className="appointment__actions">
                <Button danger onClick={cancel}>Cancel</Button>
                <Button confirm onClick={(event) => validate()}>Save</Button>
              </section>
            </section>
      </main>
    )
}