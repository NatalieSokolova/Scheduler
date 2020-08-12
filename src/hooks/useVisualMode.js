import { useState } from "react";

export default function useVisualMode(initial) {
  // sets the initial mode
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  // enables transitioning into a different mode
  const transition = (newMode, replace = false) => {
    let newHistory;

    if (replace) {
      newHistory = [...history.slice(0, history.length - 1), newMode];
      setHistory(newHistory);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
    return setMode(newMode);
  };
  // enables going back to the previous mode
  const back = () => {
    if (history.length > 1) {
      setHistory([...history.slice(0, history.length - 1)]);
      setMode(history[history.length - 2]);
    }
  };
  return { mode, transition, back };
}
