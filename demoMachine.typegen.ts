
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
          "Mute microphone": "Mute";
"Unmute microphone": "Unmute";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "Microphone" | "Microphone.Mute" | "Microphone.Unmuted" | "Video" | "Video.Hiding video" | "Video.Showing video" | "Wilecard area" | "Wilecard area.Bar" | "Wilecard area.Foo" | { "Microphone"?: "Mute" | "Unmuted";
"Video"?: "Hiding video" | "Showing video";
"Wilecard area"?: "Bar" | "Foo"; };
        tags: never;
      }

export interface Typegen3 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: "increment";
          delays: never;
          guards: "count > 5";
          services: never;
        };
        eventsCausingActions: {
          "increment": "Toggle";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "count > 5": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "Disabled" | "Enabled" | "Enabled.Off" | "Enabled.On" | { "Enabled"?: "Off" | "On"; };
        tags: never;
      }

export interface Typegen4 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Authentication.Checking user permissions level:invocation[0]": { type: "done.invoke.Authentication.Checking user permissions level:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Authentication.Checking user permissions level:invocation[0]": { type: "error.platform.Authentication.Checking user permissions level:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "Check user permissions": "done.invoke.Authentication.Checking user permissions level:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: "Error is a timeout error" | "User is admin" | "User is normal";
          services: "Check user permissions";
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "Error is a timeout error": "error.platform.Authentication.Checking user permissions level:invocation[0]";
"User is admin": "done.invoke.Authentication.Checking user permissions level:invocation[0]";
"User is normal": "done.invoke.Authentication.Checking user permissions level:invocation[0]";
        };
        eventsCausingServices: {
          "Check user permissions": "RETRY" | "xstate.init";
        };
        matchesStates: "Admin" | "Canceled" | "Checking user permissions level" | "No permission" | "Normal" | "Timeout";
        tags: never;
      }
  