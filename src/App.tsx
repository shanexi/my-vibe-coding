import { useMachine } from "@xstate/react";
import { vocabularyMachine } from "../vocabularyMachine2";

function App() {
  const [state, send] = useMachine(vocabularyMachine);
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
