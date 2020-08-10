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
      setHistory(newHistory)

      // console.log("newHistory true: ", newHistory)
      // console.log("newMode true: ", newMode)
    } else {
      //newHistory = [...history, newMode]
      setMode(newMode)
      setHistory([...history, newMode])

    // console.log("newHistory false: ", newHistory)
    // console.log("newMode false: ", newMode)
    }
    return setMode(newMode)
  }
  // enables going back to the previous mode
  const back = () => {
    // console.log("mode:", mode)
    // console.log("finalHistory: ", history.slice(0, history.length - 1))
    // console.log("prev: ", history[history.length - 1])
    
    if (history.length > 1) {
      setHistory([...history.slice(0, history.length - 1)])
      setMode(history[history.length - 2])
    }
  }
  return {mode, transition, back};
}