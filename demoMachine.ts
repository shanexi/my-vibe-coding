import { assign, createMachine } from "xstate";

export const dogMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBED2UB0BBWAbMYADgMQAyqArhAAQByqAlgMZgDaADALqKiGqwMALg1QA7HiAAeiAKwAmADQgAnogBsAZgAsGNQEYAHDK0GA7Ho2mNBtQF9bStJhz4ixAMoBbMLlyxqAGKoqBAc3EggfALCYhLSCPJKqggGehgacnIAnIYyamZZcjIy9o7o2ADuAIYA1mDEAVW+-lV4BIRhElFCIuIR8VqFGFqm8qZq7GZqWWpaWkmIRey6WjJGa+z6WnIZpSBOlbVgGO6uhMpklDSijCydEd0xfaDxcnoyGMVa+QapWuymOTsGQLBDWDQYIEyUyFKF6bKmPYHLDVOoYABCYCgUAYoigxAA4gwAG5gaiCABOYCqgnuvH4PVi-UQZlBclMy2BNkMcx+ejsDn25Rc7WIklgghpxyqADNBGAKQAKPTsVXsACUxGRbSIdMiDKecVk5khRg0GgsalGchsoMsOm07H+KvYWQMcmm9kFNwgcAkTi6Bt6RoQAFosqDQx8sjHY2oPeaOdkkcKdYRA9Fg8yEJosrp8hbTICbDM9HaVbpTL9pm7LHJBinnKiwBnGc8pIgNBGVIhDHIMFZoYZfnptu6BWUm0cTmdkvTM0yXogYwP2H33a6ssZ2XaDBDLJZoey3po5I3Dmj3EwqlSIK3DdmNNDPgCq86suZ5j2wVllvGgW8kwTG8iKCsizYYliOJ4veWZLggWQOnoyGITGMIjDu34ZDovxaHophaNYv7whoXq2EAA */
  id: "Dog",
  initial: "Awake",
  tsTypes: {} as import("./demoMachine.typegen").Typegen0,
  states: {
    Asleep: {
      on: {
        "Loud Noice": "Awake.Scared",
        "Smells Food": "Awake.Sleepy",
      },

      after: {
        "10000": "Awake",
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFmAduglgMYCGBA9jgHQDC2hA1vjlAASqxgBOLADlwLb5YsfBVgsANmABuYCQGIIFMJSbSy9FWiy4CJclVpgGTVuy68BQkWMky5CNWX2icAbQAMAXU9fEoHjIRA38QAA9EAGYADgBWSgAWDwSATljIlJSARkiANgAmFIAaEABPRCyE-MpK3ISEgHZIhoToho9o3IBfLpLtbDwiUlcaOkZmNg5uPk5BYVdxKVkFJRwVJ01Kft0hg1HjcbMpy1nrBbtlxxx1FwpfNyy-JBBA4NdQiIQY+KTU9MycgVimVEPkPB5KLk8h5mrkPFloglIjEen0MAM9MMKPsTBNzNMrPNbEs5IplKprhotOidrdDGNTJMLDM5jYcIt7BIrjcse5vG58k8AkF8CFnp9volkmkMtk8oUSuUvnFKClIlUwflkRl8g1USBtoM6TjDkyCacieyLqSuJwyJxKDwJKQAGb2-hbGlG3kmxn4k6s84krlOOn3byhV6i97iqIq34ygHy4FKwrxXJZFIeAEpBKxXXdXoGr2YvZGXFHZmEtkc5byW32x3O9Bu2aenTessMvHHFlnYmc7nOXn3R6RkVi0AS+PS-5yoGKqJJSgNBq5XKxFINHIpOFZQtojulkbl03+vuW2uk6jIABy1AAogAZXzjt4UD5xn6z2WAhUghBoiyShInyQosgRTddwyPUi0NY9sQAFXwfgwDIDB5AAJQfRDMIATVfZ4o0ncJEG3YCM1iaJokifd2m3BJFwQfI8xXNVNyA-Isl1Td8n1eDdhPbtK3NQMBzrMJYHQUgVGIF10C4AAKLJYnBABKeQBONU8-V7asg05QjhXfHBPy+dUpT+BJ1wgqEtyY+oEhXKjGgaaIUjA-JclgoscDICA4FCLTeTfaMP1jBAAFpciYyL4kyTJqKg2JvKSFJ+JLQTsR0nsqwtGtrQkUKSM+KomNAhoV2ROIqI3cEwQPYsjyyqhkAgQRTKIicYynRBojAyEPFiazcncloGi1Jid1VaJklA-MIPBdK4My41b3dYgiq6kyzP66o4WG9cxsaSaAMzaJEnaDwwJaWamgSDLmrWsgA37TrjLC97SMAgaDpG46Jsicq10oWJM1zGEEiyBo1WWw8MRayhkNQ9D0GKnrvr2wbDtGrcTqBgD8jaSg2kqOJdzSNJGuCstiBwQg5EgdHwt6n79qG-68cBpigMSLN3JusE3ImnoeiAA */
  tsTypes: {} as import("./demoMachine.typegen").Typegen4,
  schema: {} as {
    services: {
      "Check user permissions": {
        data: {
          user: {
            permissions: string[];
          };
        };
      };
    };
  },
  id: "Authentication",
  initial: "Checking user permissions level",
  states: {
    "Checking user permissions level": {
      invoke: {
        src: "Check user permissions",

        onDone: [
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

        onError: [
          {
            target: "Timeout",
            cond: "Error is a timeout error",
          },
          "No permission",
        ],
      },

      on: {
        CANCEL: "Canceled",
      },

      after: {
        "1500": "Timeout",
      },
    },

    Admin: {},
    Normal: {},
    "No permission": {},

    Timeout: {
      on: {
        RETRY: "Checking user permissions level",
      },
    },

    Canceled: {},
  },
}).withConfig({
  guards: {
    "User is admin": (context, event) =>
      event.data.user.permissions.includes("admin"),
    "User is normal": (context, event) =>
      event.data.user.permissions.includes("normal"),
    "Error is a timeout error": () => false,
  },
  services: {
    "Check user permissions": async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        user: {
          permissions: ["admin"],
        },
      };
    },
  },
});

export const fooMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDED2qCyBDAxgCwEsA7MAOhIHcACWAFy1rCoEYBiZAeQ4G0AGAXUSgADqlgFaBVESEgAHomYB2JaQDMANg1rezABybmAVl569AGhABPRUrWl9AFj13jRgEwq9jgL4-LaJi4hCTkYNR0DEzurABCAIIASnyCSCCi4pLSsgoITqR67kZGjgCcagalHpY2CHq8pM5VesruekZKzI5GfgHo2PjEYHFJKbIZElIyabmO7jWIRQ1Kni5tnp68vr0gRKgQcLKBAyFg42KT2TOIALQaCwg3RqSlr6VmGu+6vJ3MO8fBIZhCL0Rgsc6ZKY5RBzB56DSkdxqUpdTqlDTwkruf79QGhSg0UHRCGXaagXJqZgI7S8IzMIro+oqB5VUgdZgVCrMdFaT5+PxAA */
  tsTypes: {} as import("./demoMachine.typegen").Typegen5,
  id: "FooMachine",

  states: {
    "new state 1": {
      on: {
        FOO: "new state 2",
      },
    },
    "new state 2": {
      on: {
        BAR: "new state 1",
      },
    },
  },

  initial: "new state 1",

  on: {
    BAR: ".new state 2",
  },
});

export const barMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCGAnAsqgxgCwEsA7MAOgFEjVkAbMAYgG0AGAXUVAAcB7WAgFwLciHEAA9EARgCs00pIBMAFgCcK5gHYVADmYK1ANgA0IAJ6JtG0hoDMSmwcmSVilQYM2Avp5NosuQhIKKloGAEkiHHQwAFswIn4AAhxuAFcElnYkEB4+QWFRCQQAWiU5aWYbLVVbCoUNBRNzBEklbVIVLVbtBVlmAwVJDW8fECJuCDhRP2x8YjBRXIEhEWyi4pUbUgqqlRqbOoamxGLmUm0bS7sdNUHmJUltb18MWcCySmo6Rd5lgrXEG1jghtAZSG0VNINA96tIbJJmCpniAZgF5qQACIEWBfSA-PIrQqIeqSUgKBQHZyggzaJTMaTAx4KMkeQYXZQGDQGekjTxAA */
  tsTypes: {} as import("./demoMachine.typegen").Typegen6,
  id: "barMachine",
  context: {
    count: 0,
  },
  schema: {
    events: {} as {
      type: "Increment count";
      count: number;
    },
  },

  states: {
    Enable: {
      on: {
        "Increment count": {
          target: "Enable",
          actions: "Increment count by event value",
        },
      },

      always: {
        target: "Disabled",
        cond: "Count > 5",
      },
    },

    Disabled: {},
  },

  initial: "Enable",
}).withConfig({
  guards: {
    "Count > 5": (context) => {
      return context.count > 5;
    },
  },
  actions: {
    "Increment count by event value": assign((context, event) => {
      return {
        count: context.count + event.count,
      };
    }),
  },
});
