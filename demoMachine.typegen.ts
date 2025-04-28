
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "Asleep" | "Awake" | "Awake.Begging" | "Awake.Scared" | "Awake.Sleepy" | { "Awake"?: "Begging" | "Scared" | "Sleepy"; };
        tags: never;
      }

export interface Typegen1 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "On a walk" | "Waiting" | "Walk ended";
        tags: never;
      }

export interface Typegen2 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: "Mute microphone" | "Unmute microphone";
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "Mute microphone": "Mute" | "xstate.init";
"Unmute microphone": "Unmute" | "xstate.stop";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "Microphone" | "Microphone.Mute" | "Microphone.Unmuted" | "Video" | "Video.Hiding video" | "Video.Showing video" | { "Microphone"?: "Mute" | "Unmuted";
"Video"?: "Hiding video" | "Showing video"; };
        tags: never;
      }
  