import { createMachine } from "xstate";

export const vocabularyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkFwlQac1AZV0CN0gYkAB9UrAbQAYBdRUABwHtYBLAC59uAOw4gAHogCMADmaEAnIuazZ0gMwB2RQFYVAFgA0IAJ6JZ2wsy3MATIoBsW6dP2K7AX08m0WPERkVHSkgMABgKvRLOxIIDz8QqLiUgjStkoqapo6+szGZjLKhAaWzI6KxdqqdrLevhg4BIRYgIRWgPD6hICqOoBcnoAZGYB3btSAe2qAKt6Ad6k9UeJxgsJiMcm69oQODi6yBgZasrrSeeYIWwaE61qOBna6+nbFtSB+DUQt7d39Q2MT0tFcvDOJ84iLOzLDyKNYbLY7PYWdZFRSyRzyYrMDTnAy3e4BJqYNqdXoDQDPsYBx+MmMWmCTmoAWSxWoLk4O2uxM+10ZyUO3UGkUmjcp3R9UxT1xr0A4EqAI2NAAxKETaJO+8VmSQB1JBYM2DKhCEcu0IWh1Gg01S0lRuPju-MagpeA0AK-GDQDccoAd4MAqsoy2I-ckKhCA4GrOmqyFMxCOVmOewMyznXReE0Y83Y9qAPjMuoBja0Adh6AWeVABGZ1BdZPl-wQaiBBmkzGkmrOpw0LIDB3hhBRshpxbsOkcfP8sZxicAmKmAe+jM9RALOJgAbTQA68sMc2685TA2XCCX5C5HFctjXw4RnBoy25pKC9Bp2w8sV2un2B4BoOUAAHITNhTKd-GcFxtFEvbiuOKuONdbJSpVRVrQ7FLXJDwFONCEAEE1ADAXK9AFNrbNb1Je8KUkGR5HSVQOWyQwa31IFdnWfUDByTU0WjM1HnA6C4OzT47zlB9UI1Owa1SDRZGOdidjKYi7BbKM6g7SicWoy94MYOwvldBiUOSQsX1LctNg-at8gQDZHG1Lllx0FsnA0NtyKEwgpWePE3nGScZI9DZFE4oCUQ0XJzghVjTl0Y4dV0LZNVLYtQMaUyhQGMVxSeKzflkxBbPs5EDCcjYW22Vj9A8xc7ARDxiNBGojKPILLWoG0HWdRDZUimyDDsywHPi5ykt0Vizg8j8kq2NVdACoggsTAcIvdfNDWkecUVcM5rlBC43Ocestj42RlDsVJqi6kzwhEmCxIQqTc0Y5IywUZRMKyPQcLU9R6z4rkUThSELlWoLRPEuikOs-NI1Y7ZNOUeFAMUBKloe9b2ie7NJPoirBq3EbizLVFJsatTdh1DdNlcBxOQMZFcpNERuAgOBxBjfAIYGx8AFovzUynrGYOn6YZumzlWoJKFJ6cmPONc7A0Ddrq5ZE5B0VannZvbEGqDynKAwxl13TZ1SrOyDARLQNnOcoqoPPKwJxS0xaihA9V56XmFlnZyjVtcESUEoWV3IWWxF8DE1TTMDY9Q0OOLDxFw2Qt1Qhaw3E1bleJZZ2TzPDMPah73d2qGx-cbdVZB0axtmYSN9UAtPcsEo9BSe2PHxLVldGI3R1D41QWUR-Yg159KdCzr3AKBtoS6YjKgXWVxIyyyw1fVTQVEun3NcwvQO7M-ou+SLcFD7twVgqYe3N0Xmqt+jHckBnXAuBwhepj17IcfTUtHneKecWYj2JYpHTk03JLk2AyK7kTqD+6o-i7PsmTEVC8wyvudw6h-r1xkGcLeOwdDrD0OcFE3hvBAA */
  id: "词汇学习机器人",
  initial: "初始界面",
  states: {
    初始界面: {
      on: {
        开始学习: "学习模式",
        开始考试: "考试模式",
      },
    },
    学习模式: {
      initial: "展示题目",
      states: {
        展示题目: {
          on: {
            回答问题: [
              { target: "显示正确反馈", cond: "答案正确" },
              { target: "显示错误反馈" },
            ],
            跳过: "处理下一步",
            切换到考试模式: "处理下一步",
            返回主菜单: "处理下一步",
          },
        },
        显示正确反馈: {
          always: "处理下一步",
        },
        显示错误反馈: {
          on: {
            重新作答: "展示题目",
            下一题: "处理下一步",
          },
        },
        处理下一步: {
          always: [
            { target: "#词汇学习机器人.初始界面", cond: "应该返回主菜单" },
            { target: "#词汇学习机器人.考试模式", cond: "应该切换到考试" },
            { target: "展示题目" },
          ],
        },
      },
    },
    考试模式: {
      initial: "展示题目",
      states: {
        展示题目: {
          on: {
            回答问题: "显示反馈",
            切换到学习模式: "处理下一步",
            返回主菜单: "处理下一步",
          },
        },
        显示反馈: {
          always: "处理下一步",
        },
        处理下一步: {
          always: [
            { target: "#词汇学习机器人.初始界面", cond: "应该返回主菜单" },
            { target: "#词汇学习机器人.学习模式", cond: "应该切换到学习" },
            { target: "展示题目" },
          ],
        },
      },
    },
  },
});
