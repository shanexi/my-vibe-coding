import { useMachine } from "@xstate/react";
import { barMachine } from "../demoMachine";

function App() {
  const [state, send] = useMachine(barMachine);
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

        <button
          onClick={() =>
            send("Increment count", {
              value: 2,
            })
          }
        >
          Increment
        </button>
      </div>
    </>
  );
}

export default App;
