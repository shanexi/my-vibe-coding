import { useMachine } from "@xstate/react";
import { useState } from "react";
import { vocabularyMachine } from "../vocabularyMachine2";

function App() {
  const [state, send] = useMachine(vocabularyMachine);
  const [chatInput, setChatInput] = useState("");
  return (
    <>
      <div className="card">
        <pre>
          {JSON.stringify(
            {
              value: state.value,
              event: state.event,
              context: state.context,
            },
            null,
            2
          )}
        </pre>
        <br />
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="输入消息"
        />
        {state.nextEvents.map((evt) => {
          return (
            <button
              key={evt}
              onClick={() =>
                send({
                  type: evt,
                  chatInput: chatInput,
                })
              }
            >
              {evt}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
