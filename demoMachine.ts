import { createMachine } from "xstate";

export const dogMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBED2UB0BBWAbMYADgMQAyqArhAAQByqAlgMZgDaADALqKiGqwMALg1QA7HiAAeiAEwBGdhgCsMgCzqAnAGZ2Adi2qAbKoA0IAJ6JdS3RlVy1MtVsNyNqmQF9PZtJhz4RMQAygC2YLi4sNQAYqioEBzcSCB8AsJiEtIIKmaWCAAcchhaThrsBTa6CroyWt6+6NgA7gCGANZgxDGtkdGteASESRJpQiLiKdnVSiWGMkrs86pFKqYWiHKqGspaewUGqkoFlXKGDSB+LR1gGMGBhOZklDSijCwjKWMZk6DZSoYduwFkZjLoNBoFFo8lZ2MUCoZ9nICrVIQ4LlcsG1OhgAEJgKBQBiiKDEADiDAAbmBqIIAE5gVqCT68fjjTJTRCGJTFdjHAoyQz6QHAwwwnJaAoYGTuBxKLQaQwVRHeHwgN4QOASPyjNk-LKIdb5AC0hgw7AtFtK6iKMn0cgxTQCQ116QmBoQiMUyK0xwVugKisB4oWiiKkvY9klDgWBUd-mxYFd7N+UkN7B2GgOBT59lqSiU4tUFQwKMFHnk3I8qnqasxibuD3yrLdHL+hpsGCzEaUeYWhY2CF0wPNWjkLhkFW2hgKqnj1xxwSYrQZEGT+s5Q4UXYDrkWyO5NnFw52dsVDkhWYFSnnWJueIJRJJ6-dm97YZs8oDxZ0vqLiowNwC1RCFjEMc5VSAA */
  id: "Dog",
  initial: "Awake",
  tsTypes: {} as import("./demoMachine.typegen").Typegen0,
  states: {
    Asleep: {
      on: {
        "Loud Noice": "Awake.Scared",
        "Smells Food": "Awake.Sleepy",
      },
    },
    Awake: {
      on: {
        "Falls asleep": "Asleep",
      },
      states: {
        Sleepy: {
          on: {
            "Loud noice": "Scared",
          },
        },

        Scared: {},
        Begging: {
          on: {
            "Give treat": {
              target: "Begging",
              internal: true,
            },
          },
        },
      },

      initial: "Begging",
    },
  },
});

export const walkMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHUCGAbA1gOjQSwBc8A7KAYgBkxUA3MAAgAsB7AWzAG0AGAXUVAAOzWITzNi-EAA9EARgCsXbAE5ZAJgDs8gBwA2eTq4aALABoQAT0TbZ2AMxq1yrjbXGDGjXYC+382ixsAHlielR6AHcMTDIAcTACegAjVABjTCY2Tl5JIREicUkZBGM1eWwuOzttLmVSu2N1A3MrBBt7R2dXd3lPY18-EGJmCDhJAMxc4VFCpGlEAFpdFsXy5XWNzc2fQYncVFFSKfyxCTni0pW222Mu3Q0uI1kNZW1+3ejg0PCorGOZs6gYp2R7YXqNZS6XRVGpuMyWaw3O4PJ4vPS+fyfCb0MDEUYQf4FQHzBDySHYfTGbTaeR2WR2SHKNRXdq3Fw2YxcWTrXRlAbeIA */
  id: "Walk",
  tsTypes: {} as import("./demoMachine.typegen").Typegen1,
  initial: "Waiting",
  states: {
    Waiting: {
      on: {
        "Leave home": "On a walk",
      },
    },

    "On a walk": {
      on: {
        "Get back home": "Walk ended",
      },
    },

    "Walk ended": {
      type: "final",
    },
  },
});

export const callMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbdACAtqgxgBYCWAdmAHQCyx+ATgPYAOhD51ArgC5gDEAqqRzcwAbQAMAXUSgmDWMS7E2MkAA9EARgAsADgoBOAwGYDAdmMBWKwb2bjAGhABPRACYLFbeM0HN48VtLXW0AX1CnNExcAhJ2GnpmVnZBYR4IXioRCWkkEDkFJRU8jQR7MwoQ411dN3E67WNtaydXBANLClMjTTdLADYTGuN+8MiMbDwiMkoANWIIMAYKAGVWAHcyKCwANwWl3gAJfd39hhzVAsVlUlVSt1MvC1qQ3TM-A11HF0RLM31dJ8-JZzMF-mYxiAopNYjMKPNFstjhAtqdEbw1gx1milhc8lcircSu5Htpnm5Xu9fF9Wr83AYKOILMYzIMTGYzMFwhEQKQGIt4HloTFpuRLvJrsVQKUALSaXTiCj9Uycyz1cTNJn9WkIGXvChuZp+fraU3GQKWSHCqZxSgJRgsNhgcWFG53RBy4xuJUqyxqhpq1k6-RaowK-p9UyNTRWiYi23UWgO5J2kQuyVE6UekI+0H+jWB3Q6zSDLzWT7VXT+PoGWPRG1w+1JJ0UVIiCDpwnuhDNCoWaz0nQmczfNqafVvMxuNz9Etq81WOsw0VzM6dt3EhB9QwNNyaHSmiO9Sw602aCicjURvSDGe1nnW2HsBFLVYbVF7RHrqXqRCeAy7vupraEeo6-E0lTTh0Iz2ICHRLvGcIvkiCwfmu+ISl2m7VJ0Hy9B0nLaOO2g6tYFRevS1iztURiWtyQA */
  tsTypes: {} as import("./demoMachine.typegen").Typegen2,
  id: "Call machine",
  type: "parallel",
  states: {
    Microphone: {
      states: {
        Mute: {
          on: {
            Unmute: {
              target: "Unmuted",
              actions: "Unmute microphone",
            },
          },
        },
        Unmuted: {
          on: {
            Mute: {
              target: "Mute",
              actions: "Mute microphone",
            },
          },
        },
      },

      initial: "Mute",
    },
    Video: {
      states: {
        "Showing video": {
          on: {
            "Hide video": "Hiding video",
          },
        },

        "Hiding video": {
          on: {
            "Show video": "Showing video",
          },
        },
      },

      initial: "Showing video",
    },
  },
}).withConfig({
  actions: {
    "Mute microphone": () => {
      alert("Microphone is muted");
    },
    "Unmute microphone": () => {
      alert("Microphone is unmuted");
    },
  },
});
