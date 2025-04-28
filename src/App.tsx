import { useMachine } from "@xstate/react";
import { callMachine } from "../demoMachine";
import { useEffect } from "react";

function consoleLogTransition() {
  const newState = callMachine.transition(callMachine.initialState, {
    type: "Unmute",
  });
  console.log(newState.value, newState.context, newState.actions);
}

function App() {
  const [state, send] = useMachine(callMachine);
  useEffect(() => {
    consoleLogTransition();
  }, []);
  return (
    <>
      <div className="card">
        <pre>
          {JSON.stringify(
            {
              value: state.value,
              context: state.context,
            },
            null,
            2
          )}
        </pre>
        <br />
        {state.nextEvents.map((evt) => {
          return (
            <button key={evt} onClick={() => send(evt)}>
              {evt}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
