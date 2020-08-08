import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";
import Status from "components/Appointment/Status.jsx";
import Confirm from "components/Appointment/Confirm.jsx";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  const deleteInt = () => {
    transition(DELETING)
    props.cancelInterview(props.id).then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
    <Header time={props.time} />
    
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && (<Form
    onSave={save}
    name={props.name}
    interviewers={props.interviewers}
    onCancel={back}
    />)}
  {mode === SAVING && (<Status message={"Saving"} />)}
  {mode === DELETING && (<Status message={"Deleting"} />)}
  {mode === CONFIRM && (<Confirm 
  message={"Are you sure you would like to delete?"} 
  onCancel={back}
  onConfirm={deleteInt}
  />)}
    </article>
  )
}