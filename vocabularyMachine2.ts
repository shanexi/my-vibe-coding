import { createMachine, assign } from "xstate";
import * as services from "./vocabularyMachine2/services";

export type Service<
  TProtocol extends { services: Record<string, { data: unknown }> },
  TServiceName extends keyof TProtocol["services"]
> = () => Promise<TProtocol["services"][TServiceName]["data"]>;

export type Services = {
  获取题目: {
    data: {
      question: string;
      answer: string;
    };
  };
};

export type Protocol = {
  services: Services;
  context: {
    sayHi: string;
    servicesReturnValues: Partial<Services>;
    count: number;
    record: Record<string, [string, string]>;
  };
};

export const vocabularyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkG45QGVdAjdIGJAAfUGnNLAbQAYBdRUABwHtYBLAF15cAduxAAPRACYArADZCAdgCMAFkWKmM1aoCc2gDQgAnogAcywgGYpU3cqt6zMtbIC+bo2ix4iZKnSAwAGAq9HMbEgg3HyCImKSCFJWVoQyVnKqMlpSWopSykamCcoyhHJScrrqirr2ysqKHl4YOASEWIAKcoC3aoSA7cGAa8qAbnqAqjqAXJ6AGRmAd26UECJghLzCAG5cANZz3i1EHd39w+MTCAvLAMYAhjHCYWFiUQJCohHxZWYpMma5umZWuo5McgWIRSvd6KFxlOTpVTuTwgDa+NqYLq9QajSaUMAAJwxXAxhA4ABtzgAzHEAW0IcNa22Re0mhyWXDOFyurBuPDusUeiHUCjstlUTCYqjqVhkUgBCGUlUIyjkTDUxTkijMZnsVkasOa8OpqKmgEgEwCXRoAVb0AEhbXCK3C5xRA-XSlIVyKzKQVaMzyiXFFJyFVyFzOKTKxRyDWUraI7q6yiG00MZThTjsq1chA-SxKjTeoO2OT1CW5UrPEFB1RuvQhrVU8OEQB8ZiNAMbWgDsPQCzyoAIzMogGg5QAAcmMAAQ4nuABiVUIBuA0ArhnmhPRe7WyXaZLKZzvHMq9QyCUAWllCidWnUAZVsm95Z8laRtcbrY73b7GMHI-HcbZU85oHixQFpQFgq+ViDIo3eRSCkqYrsosipGYqjHpsCJniMgCYqYA99GXoAs4nBIAyvqALJKkwTpEibTsmuiKMkbypKoFRJPKTBmB6iiqIQTDVEwNR1DUcrkdB2pVrWSGXl2vb9kOY64ZaBGvjaOivOkPx-M6ObiiY0gBkoIKJORFTZBonGnt0PHIW2-E3newmPha+EvhIEnJN8uhSKquTvDIPwSkkdrsbI-p-mk2lhnBgA05oAdvEjpQgB7agOgBpmeOrJmc+DziZK7xMIQFj2MqGQQiWCmFOuNgvDuopSORqQuDIDQasIXAQHAYihk+HJxZZCCbiUNSQf66QOCWqhWBuwolI6Nj6N8ZQ-L6PkkBQdVJvFNgMfKLjqKKZi+rKEoQgxP5urYZj8uqMKhrBnRTWJjXCskxaFURYE5sRAE1IQ9g5k6jiOPoujjdSuy6sdFnxORlgXXoKjlPUPWKQgyoPT8JaVAuv66Ee+0Vr5Eb7D9DXxNUCgI26zpCkwTpBh6JSJN6xRMHZT2lR9VaAIyagCksYAC8YjOjM6+iUUqio4qSfE4Hq2dYAaLZkYFiuUNNwReLas8mYFQqU2S+jDNkOMThCkxYmSUw41NIyeKM1gh+ky-FctAeRGSlWU1QuGDhSsYQGTvGkgoBgGPwS7pIyBSOJuNfUBMyr+zv1GKXVqxr3OOKq-3BnrMGBIAXOqABD-gCh+tQgB8poAkP9+39DgpO1O0llYFiqC5s32BY3zaNRxFlR4QA */
  tsTypes: {} as import("./vocabularyMachine2.typegen").Typegen0,
  id: "词汇学习机器人",

  schema: {} as Protocol,

  states: {
    主界面: {
      on: {
        开始学习: "学习乐园",
        开始考试: "考场（待开放）",
      },
    },

    学习乐园: {
      states: {
        获取并展示题目: {
          invoke: {
            src: "获取题目",
            onDone: {
              target: "展示题目",
              actions: "获取题目",
            },
            onError: "失败提示",
          },
        },

        展示题目: {
          on: {
            选择答案: [
              {
                target: "显示正确反馈",
                cond: "正确",
              },
              "显示错误反馈",
            ],
          },
        },

        失败提示: {},

        显示正确反馈: {
          on: {
            "下一题 or 到汇总页": [
              {
                target: "获取并展示题目",
                cond: "未完成",
                actions: "计数",
              },
              "显示本轮汇总",
            ],
          },

          entry: "记录正确答案",
        },

        显示错误反馈: {
          on: {
            重试当前题目: "展示题目",
            "下一题 or 到汇总页": [
              {
                target: "获取并展示题目",
                cond: "未完成",
                actions: "计数",
              },
              "显示本轮汇总",
            ],
          },

          entry: "记录错误答案",
        },

        显示本轮汇总: {
          on: {
            回到首页: "#词汇学习机器人.主界面",
          },
        },
      },

      initial: "获取并展示题目",
    },
    "考场（待开放）": {},
  },

  initial: "主界面",
})
  .withConfig({
    actions: {
      获取题目: assign((context, event) => {
        context.servicesReturnValues.获取题目 = event;
        return context;
      }),
      计数: assign({
        count: (context) => context.count + 1,
      }),
      记录正确答案: assign((context, event) => {
        context.record[context.count] = ["y", event["chatInput"]];
        return context;
      }),
      记录错误答案: assign((context, event) => {
        context.record[context.count] = ["n", event["chatInput"]];
        return context;
      }),
    },
    services: services,
    guards: {
      正确: (context, event) => {
        return (
          context.servicesReturnValues?.获取题目?.data?.answer ===
          event["chatInput"]
        );
      },
      未完成: (context, event) => {
        return context.count < 5;
      },
    },
  })
  .withContext({
    sayHi: "Say Hi!",
    servicesReturnValues: {},
    count: 0,
    record: {},
  });
