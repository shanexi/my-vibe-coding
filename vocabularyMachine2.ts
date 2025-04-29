import { createMachine } from "xstate";
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
};

export const vocabularyMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkG45QGVdAjdIGJAAfUGnNLAbQAYBdRUABwHtYBLAF15cAduxAAPRACYArADZCAdgCMAFkWKmM1aoCc2gDQgAnogAcywgGYpU3cqt6zMtbIC+bo2ix4iZKnSAwAGAq9HMbEgg3HyCImKSCFJWVoQyVnKqMlpSWopSykamCcoyhHJScrrqirr2ysqKHl4YOASEWIAKcoC3aoSA7cGAa8qAbnqAqjqAXJ6AGRmAd26UECJghLzCAG5cANZz3i1EHd39w+MTCAvLAMYAhjHCYWFiUQJCohHxZbpKqlZmUoqpiqrKTFIFRD1QhMCqZJLVWyffSNEAbXxtTBdXqDUaTShgABOmK4mMIHAANucAGa4gC2hHhrW2KL2k0OSy4ZwuV1YNx4d1ij0Q6SYpXUbysyjMmmU+kBCGFLyYvzsmjkYqFP1hVK2SO6aKmgEgEwCXRoAVb0AEhbXCK3C5xRC6KwvOQyuRCpgOmRmJj5ExAkryMxmOQuZyfEVyFXNBE0zWUXWGhjKcKcDlm7kIS2WOQaRRyAO2BWKCW5UplL2p9LOvRBnzU9WEQB8ZiNAJipgHvowCzyoAIzMogFnE4KAZX1ALJKk2Nsei93NicUySdqSLZh0ZjSEocqn5qmcGSkGS9VganjhwfLyOrgGNrQB2Hs3KIBoOUAAHJjAAEuMvgAYlVCAbgNAK4ZfciccHCYcyik1kyxRXMi6F8jgSgAtB8v66BYST-JkujuJuqqIruIyHse55Xje97PlGMZvgOXKgPEajpoQ5R+kw065LoWhgeuhDFDYdoWKoPqWqopabMh3TVoANOaAHbxj6UIAe2q3oAaZkvmyJrvoREhAmYlqlBY3o2rkTA2FYdHAgpnzVF6FR6R4m7CFwEBwGIqrsgRDxEYgoHFIQNSTn66RzpOmluggoGqFoZHFJoCm1L8TAbk0ZZ+BQVmcjZckIDYIIui46hWE6PrKHIEpyAolFJM6tgfCuVicSG6pRfGtkIL8yRpqoK5Ad+WYeYU9kVEpnzfo4dQul6xU7jsqL7GVH4Vaxlg1XVKjlPUTWIIoZiOexCm-FRujpr1arIpqQ2yfEeXWD6AU1OkjgZZ5DmJOmxT-N6DgyKFW7hdxhCAIyagCksYAC8YjNtMW7S61hdTBmRMPVs4imRlF2jBfzaLY61PfuR5Nt9Q7frVpTZD6i6WjUDiziUF0WJkUg3Sl91ITS1b1s2yOfiuP5lKC2gKVa9gzQguYwSK2gyPIUpSHDgSAFzqgAQ-4AofrUIAfKaAJD-NMjQ4KQuR8i7vGoEpJD+9jQfoPkiuucMUyMAmPrLsX1OpDHrrr9QyCuk542RaTThkjhLQqgZGUAA */
    tsTypes: {} as import("./vocabularyMachine2.typegen").Typegen0,
    id: "词汇学习机器人",

    schema: {} as Protocol,

    states: {
      主界面: {
        on: {
          开始学习: "学习乐园",
          开始考试: "考场（待开放）",
        },

        entry: "展示招呼语",
      },

      学习乐园: {
        states: {
          获取并展示题目: {
            invoke: {
              src: "获取题目",
              onDone: "展示题目",
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
  },
  {
    actions: {
      展示招呼语(context, event, meta) {
        // buttons
        // meta.state.nextEvents 可以作为 buttons
        console.log("展示招呼语", { context, event, meta });
      },
    },
    services: services,
  }
);
