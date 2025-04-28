import { assign, createMachine } from "xstate";

export const dogMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBED2UB0BBWAbMYADgMQAyqArhAAQByqAlgMZgDaADALqKiGqwMALg1QA7HiAAeiAKwAmADQgAnogBsAZgAsGNQEYAHDK0GA7Ho2mNBtQF9bStJhz4ixAMoBbMLlyxqAGKoqBAc3EggfALCYhLSCPJKqggGehgacnIAnIYyamZZcjIy9o7o2ADuAIYA1mDEAVW+-lV4BIRhElFCIuIR8VqFGFqm8qZq7GZqWWpaWkmIRey6WjJGa+z6WnIZpSBOlbVgGO6uhMpklDSijCydEd0xfaDxcnoyGMVa+QapWuymOTsGQLBDWDQYIEyUyFKF6bKmPYHLDVOoYABCYCgUAYoigxAA4gwAG5gaiCABOYCqgnuvH4PVi-UQZlBclMy2BNkMcx+ejsexuEDgEicXQZTziiAAtFlQdKBWVnG0iOLor0pQhNFkMAZNgCYaY5nptmyZMtUtZ2exgRpNnpEQ59uUUUc1YznlJEBo5SpEIY5BgrHlTH9tGoIxokS7UcdTu1kvT1UyXogsjqOQGDED08Z2aDwekrKNAYD+bsncjYycmFUqRB3ZLmWDoZ8DQZ-nosuZ5n6wVllmpMuw3pMJm9HUrDmjMdjcVBGxrm1kdBo9OuV+mYSN832MjpfloHVprAP4VH7LYgA */
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
  /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbdACAtqgxgBYCWAdmAHQCyx+ATgPYAOhD51ArgC5gDEAqqRzcwAbQAMAXUSgmDWMS7E2MkAA9EARgBsADgoAmTQHYALAGZtATm3nxl8QFYANCACeiU6f26rm3cYGppriBua6BgC+ka5omLgEJOw09Mys7ILCPBC8VCIS0kggcgpKKkUaCP6mFOK2xlYG4r562g2uHgjmjuYU2ib+1ubDVk6m0bEY2HhEZJQAasQQYAwUAMqsAO5kUFgAbksrvAASh-uHDAWqJYrKpKqVYcYUjj3d4sbGTtriVsYdiC+vXMmlMVisph6fnMExAcWmiTmFEWy1WpwgO3OqN4GwYmyxKyuRRuZXuFUQTxeb0cHy+jh+fwBCG0PQo3isjgMARC3hMsPhCVm7AA6sR0GB8Kg6BAsFKwKgKAAxBgMXgAKiJsnkt3KoEqOnEfUcul0tlNnw+5iZmj+bK+4lMgQsxjsVn5U0FSUoovFkulsro8ooACEperNcVtaSHlofkaTWa2l8XdaaX1Ibp3gFGo1xrDSAxlvAigKZl7rlG7jGEABaIJMut5ybxMtIlKMFhsMAV0pV8kIevuCnabSGCEGRxWczgnoT7TuluI5K0DvpSh5Hg9nVkvWAgxM8IGWrQkHWJp2TQLhFC9crtJdiiZEQQLfR-uWGpWE0TgINb+mA9dBqSdNGGHRGnscQ+RiOEPVbdgURWV8+13AcAKHBB6VHHQRy8UwRx0HQr09JFENWXFtlIXYDlRZDdXUPcmRZKxDGnOoPxpIx5xg0slwWC4KHRTEaKQ4lK3oypwl6cFTUnV4dFMLimP6CgXVGKd+kdKDjGI+DvTFCUpRlOVUDoncGLQpjgQMAw-GMRwLBsfCoh4uC+IoH1DP9EylRVMzq0CVMal8R0aQ5SdtC5XRdPczy-WMwMFVDOh-P7IwWO8B1dHsbpssCTRU2eadQt+V4bCi6JoiAA */
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

    "Wilecard area": {
      states: {
        Foo: {
          on: {
            "*": "Bar",
          },
        },

        Bar: {
          on: {
            "*": "Foo",
          },
        },
      },

      initial: "Foo",
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
        "Permissions detail received": [
          {
            target: "Admin",
            cond: "User is admin",
          },
          {
            target: "Normal",
            cond: "User is normal",
          },
          "No permission",
        ],
      },
    },

    Admin: {},
    Normal: {},
    "No permission": {},
  },

  initial: "Checking user permissions level",
});

export const fooMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDED2qCyBDAxgCwEsA7MAOhIHcACWAFy1rCoEYBiZAeQ4G0AGAXUSgADqlgFaBVESEgAHomYB2JaQDMANg1rezABybmAVl569AGhABPRUrWl9AFj13jRgEwq9jgL4-LaJi4hCTkYNR0DEzurABCAIIASnyCSCCi4pLSsgoITqR67kZGjgCcagalHpY2CHq8pM5VesruekZKzI5GfgHo2PjEYHFJKbIZElIyabmO7jWIRQ1Kni5tnp68vr0gRKgQcLKBAyFg42KT2TOIALQaCwg3RqSlr6VmGu+6vJ3MO8fBIZhCL0Rgsc6ZKY5RBzB56DSkdxqUpdTqlDTwkruf79QGhSg0UHRCGXaagXJqZgI7S8IzMIro+oqB5VUgdZgVCrMdFaT5+PxAA */
  id: "FooMachine",

  states: {
    "new state 1": {
      on: {
        FOO: "new state 2"
      }
    },
    "new state 2": {
      on: {
        BAR: "new state 1"
      }
    }
  },

  initial: "new state 1",

  on: {
    BAR: ".new state 2"
  }
});
