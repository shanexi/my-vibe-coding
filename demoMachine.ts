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
  /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbdACAtqgxgBYCWAdmAHQCyx+ATgPYAOhD51ArgC5gDEAqqRzcwAbQAMAXUSgmDWMS7E2MkAA9EARgBsADgoAmTQHYALKYCcB3eNMGArLt0AaEAE9EB0-YpXx9420dXQBmY1sDAF9I1zRMXAISdhp6ZlZ2QWEeCF4qEQlpJBA5BSUVIo0ETV1TCnFtMIsaoJCHA1cPKvtxCm1vUKaLbWsQ021o2IxsPCIySgA1YggwBgoAZVYAdzIoLAA3JZXeAAlD-cOGAtUSxWVSVUqDMIp7e1HxY1HRgOMOxG6el9jLoDAZ-No+qYJiA4tNEnMKItlqtThAdudkbwNgxNhiVlcijcyvcKp5nq93p9TN9jL93IhvD17NUvK0nvYgmNojEQKQGMt4EVYQlZuRrvJbuVQJUALReP4IOW1cQq1Vq1WaKE84UzJKUFKMFhsMDi0p3B6eUwKhoUNkWExPCymcSaTQhcbaqYivXUWiG9L6kSmyUk6WIYztelVYwWCiaMEqixmEL2mxRT3xXUIg1pY0UTIiCDB4kWhDu2pNEEBbQWcQWEImBXVTS9BOaZktCxWLWTTPw9hIlbF82khDyqPukJxixvePmWwBELQnX9hYXdZbdEHZHDqXqcORzrebSGbTAzRNal6ezp3tw0Vr5EUVFbi670P7suhXxNcI1EJ1hSCr9BQgTnpe7q6De3KREAA */
  id: "Call machine",
  tsTypes: {} as import("./demoMachine.typegen").Typegen2,
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
});
