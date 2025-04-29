import { createMachine, assign } from "xstate";
import * as services from "./vocabularyMachine2/services";

export type Service<
  TProtocol extends { services: Record<string, { data: unknown }> },
  TServiceName extends keyof TProtocol["services"]
> = () => Promise<TProtocol["services"][TServiceName]["data"]>;

export type Protocol = {
  services: {
    获取题目: {
      data: {
        question: string;
        answer: string;
      };
    };
  };
  context: {
    sayHi: string;
    currentAnswer?: string;
  };
};

export const vocabularyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkG45QGVdAjdIGJAAfUGnNLAbQAYBdRUABwHtYBLAF15cAduxAAPRACYArADZCAdgCMAFkWKmM1aoCc2gDQgAnogAcywgGYpU3cqt6zMtbIC+bo2ix4iZKnSAwAGAq9HMbEgg3HyCImKSCFJWVoQyVnKqMlpSWopSykamCcoyhHJScrrqirr2ysqKHl4YOASEWIAKcoC3aoSA7cGAa8qAbnqAqjqAXJ6AGRmAd26UECJghLzCAG5cANZz3i1EHd39w+MTCAvLAMYAhjHCYWFiUQJCohHxZWYpMma5umZWuo5McgWIRSvd6KFxlOTpVTuTwgDa+NqYLq9QajSaUMAAJwxXAxhA4ABtzgAzHEAW0IcNa22Re0mhyWXDOFyurBuPDusUeiHUCjstlUTCYqjqVhkUgBCGUlUIyjkTDUxTkijMZnsVkasOa8OpqKmgEgEwCXRoAVb0AEhbXCK3C5xRA-XSlIVyKzKQVaMzyiXFFJyFVyFzOKTKxRyDWUraI7q6yiG00MZThTjsq1chA-SxKjTeoO2OT1CW5UrPEFB1RuvQhrVU8OEQB8ZiNAMbWgDsPQCzyoAIzMogGg5QAAcmMAAQ4nuABiVUIBuA0ArhnmhPRe7WyVOqTWTLFKQZXSgxwSgC0Znnos+DisTFkTF00KaPkrSNrjdbHe7fYxg5H47jbKnnNA8TU3sI5X9TC+HxaJuVhAsUNiOhYqi+j8qjlueYaXiMgCYqYA99E3oAs4nBIAyvqALJKkwTpEibTsmq7JG8qTpCqOhfP8JiIA4qilNR2hihkKogXBmwIohgA05oAdvEjpQgB7agOgBpmeOrIWkR74SPRqrJN6yhmBCTC5EwNhWMB9SEKqAbVD6q6fB4MLCFwEBwGIoavhyDwfogG6ejUZglmK6QMc5ml0QgG4CiUeTyCqDgMd6nHwv41lJnZCA2IQgrFGoiiispYIShCsVfFYbq2Nuy7qjCobcZ0EXEVFwrJMWy6rso5T1J5hQORUpTbrkxRQe8ZQyKFF47Ci+zFTJ8RQZYFV6CoNWJXmLw1I4qrCgBughflFYIRGfVSW+tmyQg1QKAtbrOkK6n1LRhSeokimZFIykODIDRLfBhWEIAjJqAKSxgALxiM-WbU8MglFKoqOKknxOB6J7WAG6iivKsjZl1K01vWzYtl9M7VVCpTZL6Ja2mqHp+WkFiXddop3WeXHUrWqGtijyZo-OZR-No8k1A4eY7ge7wsfISknnDj21vxI401F9TqTKIHvE6oLLs5eM-gTgMzZUObBvdXGBIAXOqABD-gCh+tQgB8poAkP-C1tZUpP63oy5lagSkk872BY3zaP+iV3R4QA */
  tsTypes: {} as import("./vocabularyMachine2.typegen").Typegen0,
  id: "词汇学习机器人",

  schema: {} as Protocol,
  context: {
    sayHi: "Say Hi!",
  },

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
              actions: "成功获取题目",
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
                target: "展示题目",
                cond: "未完成",
              },
              "显示本轮汇总",
            ],
          },
        },

        显示错误反馈: {
          on: {
            重试当前题目: "展示题目",
          },
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
}).withConfig({
  actions: {
    成功获取题目: assign((context, event) => {
      return {
        currentAnswer: event.data.answer,
      };
    }),
  },
  services: services,
  guards: {
    正确: (context, event) => {
      return context.currentAnswer === event["chatInput"];
    },
    未完成: (context, event) => {
      return true;
    },
  },
});
