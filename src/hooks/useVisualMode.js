import { useState } from "react";

export default function useVisualMode(initial) {
  // sets the initial mode
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  // enables transitioning into a different mode
  const transition = newMode => {
    const newHistory = [...history, newMode]
    setHistory(newHistory)

    console.log("newHistory: ",newHistory)
    setMode(newMode)
    console.log("newMode: ", newMode)
  }
  // enables going back to the previous mode
  const back = () => {
    console.log("mode:", mode)
    console.log("sliced: ", history.slice(0, history.length - 1))

    setHistory(history.slice(0, history.length - 1))

    console.log("finalHistory: ", history.slice(0, history.length - 1))
    console.log("prev: ", history[history.length - 1])

    setMode(history[history.length - 2])
    
  }

  return {mode, transition, back};
}

