
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.词汇学习机器人.学习乐园.获取并展示题目:invocation[0]": { type: "done.invoke.词汇学习机器人.学习乐园.获取并展示题目:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "获取题目": "done.invoke.词汇学习机器人.学习乐园.获取并展示题目:invocation[0]";
        };
        missingImplementations: {
          actions: "成功获取题目";
          delays: never;
          guards: "未完成" | "正确";
          services: "获取题目";
        };
        eventsCausingActions: {
          "成功获取题目": "done.invoke.词汇学习机器人.学习乐园.获取并展示题目:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "未完成": "下一题 or 到汇总页";
"正确": "选择答案";
        };
        eventsCausingServices: {
          "获取题目": "开始学习";
        };
        matchesStates: "主界面" | "学习乐园" | "学习乐园.失败提示" | "学习乐园.展示题目" | "学习乐园.显示本轮汇总" | "学习乐园.显示正确反馈" | "学习乐园.显示错误反馈" | "学习乐园.获取并展示题目" | "考场（待开放）" | { "学习乐园"?: "失败提示" | "展示题目" | "显示本轮汇总" | "显示正确反馈" | "显示错误反馈" | "获取并展示题目"; };
        tags: never;
      }
  