import { useMachine } from "@xstate/react";
import { callMachine } from "../demoMachine";

function App() {
  const [state, send] = useMachine(callMachine, {
    actions: {
      "Mute microphone": () => {
        console.log("Mute microphone");
      },
      "Unmute microphone": () => {
        console.log("Unmute microphone");
      },
    },
  });

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
