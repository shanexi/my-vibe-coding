import { assign, createMachine } from "xstate";

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

export const counter = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2UoBswDoCiAdgIYBG2EAxANoAMAuoqAA6qwCWALm6gYyAB6IAtAEYRAZhwBWGgDYpADgAsAJgCcy2eNUAaEAE9ENHAtkrTC0wHYVMjQpEBfR3rQZs+YmUg4A8gQo3LDBaBiQQFnYuHj5DBBEFKRw1NRpLGnFbGilxKyk9QXiFSXlLKREzcRzy2WdXdGDPUnI-ADNWwIbsUL5Izm5ecMKhFWzkjXNZJVkrLRoaKz04lXEFHDEFDPEUlbUlKyc6kAJUCDg+IOxe1n6YoeFxGhFxhUnp2ceFpeERBeTi2QiJQOTLmFRKI6XXCEZqQa5RAZ8Ya2SQpV6md5zL4GRAaHCyGYpYEqWzmcqQrrQrwtfzw26DUCFGjfBCjNarbRSRRWBRWVKzCnuKmwiBtVp06IMgRGFmZYzAmjTFYWFQScSCxoAETYsBFEsR93iUlkOBoanEElUq3UT3ELJGxgJcg0aSsNnNimcziAA */
  tsTypes: {} as import("./demoMachine.typegen").Typegen3,

  id: "Toggle",

  context: {
    count: 0,
  },

  initial: "Enabled",

  states: {
    Enabled: {
      initial: "On",

      states: {
        On: {
          on: {
            Toggle: {
              target: "#Toggle.Enabled.Off",
              actions: "increment",
            },
          },
        },

        Off: {
          on: {
            Toggle: {
              target: "#Toggle.Enabled.On",
              actions: "increment",
            },
          },
        },
      },

      always: {
        target: "Disabled",
        cond: "count > 5",
      },
    },
    Disabled: {},
  },
}).withConfig({
  guards: {
    "count > 5": (context) => context.count > 5,
  },
  actions: {
    increment: assign({
      count: (context) => context.count + 1,
    }),
  },
});

export const authenticationMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFmAduglgMYCGBA9jgHQDC2hA1vjlAASqxgBOLADlwLb5YsfBVgsANmABuYCQGIACgKEixLCGHTF8ElpzCEw+WRADaABgC6iUDzIjyOWyAAeiAMwAWC5R9eATh8LADYQgHYPD3CAGhAAT0QARg8AygAOJIAmQKys8K8kgI90gF9SuLQsXAISJxo6RmY2Dm4+TkFhURxxKVkFZQ7VbvFNbV19Q2NTMySbJBB7R26XdwRvX38gi1CIqNiE5ID0yg8LLItwgp8i7y9yyoxsPCJSbobDJtZ2Ll4VLvUfTkSn+ah6Gi0Oj0BiMJkgZiy8zsDnwTlWnh8fgsgWCYUi0TiiQQmVOeQCWVSFwArCEvFSPOUKiAcGRNPAFlVnrU3hQXEtUSsFmsALQhQmIYVUygBGWyuVyhlMzk1V71WifJjfVp-IYA8FAiR8lFooWILxZcUIAJJShJFJZAJU8JJS7hLJJe5Kp4qurvZAQQTOBb8k2gNZXG1UrxeDzZJJUgIhd3pS0pNLHbHOgLhBPbMpe6ovX0USgAOTIHWIhuDxsFYcQEcoUZjcYTSaSKcOCCKJy84R2Pg8DqTUSyDxAyqLPKo5Z1nTBRuWvNNCEbzdj7rbyctJMCFgCFg8SYptPSnvKQA */
  id: "Authentication",

  states: {
    "Checking user permissions level": {
      on: {
        "Permissions detail received": [{
          target: "Admin",
          cond: "User is admin",
        }, {
          target: "Normal",
          cond: "User is normal"
        }, "No permission"],
      },
    },

    Admin: {},
    Normal: {},
    "No permission": {},
  },

  initial: "Checking user permissions level",
});
