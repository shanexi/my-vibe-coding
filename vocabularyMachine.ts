import { createMachine, assign } from "xstate";

export const vocabularyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkFwlQac1AZV0CN0gYkAB9UrAbQAYBdRUABwHtYBLAC59uAOw4gAHogBMzAKyEAnABY5AZjUB2eXIAcW5gDYANCACeiZcoCMhOYevXFi5munTFAX0+m0WPERkVHSkgMABgKvRLOxIIDz8QqLiUgjuCirqBnJ6BibmMsy2mmr2usoahq72ht6+GDgEhFiAhFaA8PqEgKo6gFyegBkZgHdu1IB7aoAq3oB3qd1R4nGCwmIxyXLWmoTSykWK7tJqyoa6phYIpcyEBYbSp4ZF1rrqNSB+9UTNbV19g6Pj1tFcvNOJc4gLJYrNYbLY7PaIRTXQiOQyAwzOXSGNy3e4BRqYVodHr9QDPsYBx+ImMSmCVmoHmi2WqzU63cYN2eQQmichE0zO2Kk0Czh1lRdXRT0IgD4zTqAY2tAHYegFnlQARmdQid94jMkohdIolmpDKp1KpmLoCtIIQdNVTrHJpNYNVdVWo+f4GoKRYBMVMA99Ey6iAWcTAA2mgB15Iby2I-UnKhDI2xGaRmpyaZQRvSGxTFZYuRT2NTXTQeW0PDFYp2u2WAaDlAABy4zYk0DSv+BzVhA1Wq2cl1+vjZVrGb0WWuq2syizAsxbUAIJqAMBdi4BTazlZeJFb+5MQjihhGULk0622pUbDP2XOkxzVFUWNN0umkmj79oHhBH47ln3LitnkhVNbrWQbTesBsZB8IDgtp+ZaxmC5XRz0eS8RUABCNAEu-N1i0AO3j-RJSs5wQT9zTsORLhUTUrWUQ1VF0Jc1mUE8NmPXkfDufkL1zToYLdQBwJUAI2NAAYlCJWiQmcySfEMv32RYimOMo5ChY81GYRRNTAnM2ig2DZUAFfiBkAbjlAB3gwBVZS4h8eOSc00lUDRtE7HJDTcXce1KGwdms6RQKotEGg454cTeMZtN+XTECPWtmHNXVZGXaNNENJw5GUZYuWcDwjEUSjajtIhnOxV5hncu9px04MfIk-yT2YILVlC65FGOAprB2QxNVy3sHJopLwixa8iwnDygyrTRkSXJwViRQyti3edj0MYjSgRNw1AtLw6sSwhkua1qMoVTzg1WXcPAkyTTk6641GKi1fz1dI1g1eyEuzZL5LgotEKnZb2tQzQkSXa5NQWRxmF1XIBIuI5wuKMT9C22rzvRS76IU6gWNYp42pQ3izUNWRVUwowkQcdIURmi7GrkiG3WU9StLugMsqrVIlH64zsm0b6VVscy4ucFN3DheyqJEbgIDgcRHPwe8VqrABaOmECFtJmclqWMxkoJKAFh7eJjQ19BhZldDZK5lGAmxpBkp4Ffh5JJqOCM4XUc0zhULQzOZGEFj89c3DPbH+yxF5ekNx9jb0ZZ7DfS2ETKELGWXCKuXsdtYRsOR9YgsUpWlL2vKZdQ2w1DN0d1T8VdOJRdV0CqNB7U647ol0ZWT4MuTUdOLjsqrs-4yFW3C+QY7ZKx1jLodRxaquqyAhEl2Ztxfu0GlDS5I59ShQTcqMHvhXxpPMsF1CLTcJcdgzAqqoknsCJRqxC-M1RM7VGTnIH1DzQZxxZBpDwKpcfDGVNDVazi08qs7tNqldk5XGKVPZr0VnpUStYH6uHWHFBEBVQraAiqRXKY0ThX2AQtG+vFkTILsmmY8qw9CrmKqUL+WgNbEI7Gdais1wYMVXvdI2z51RqkWFVMoVwsiIIKHYQSjZTza0tt4bwQA */
  id: "词汇学习机器人",
  initial: "初始界面",
  context: {
    questionCount: 0,
    correctCount: 0,
  },
  states: {
    初始界面: {
      entry: assign({
        questionCount: 0,
        correctCount: 0,
      }),
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
              { 
                target: "显示正确反馈", 
                cond: "答案正确",
                actions: assign({
                  correctCount: (context) => context.correctCount + 1,
                  questionCount: (context) => context.questionCount + 1,
                })
              },
              { 
                target: "显示错误反馈",
                actions: assign({
                  questionCount: (context) => context.questionCount + 1,
                })
              },
            ],
            跳过: {
              target: "处理下一步",
              actions: assign({
                questionCount: (context) => context.questionCount + 1,
              })
            },
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
            { target: "显示成绩反馈", cond: (context) => context.questionCount >= 10 },
            { target: "展示题目" },
          ],
        },
        显示成绩反馈: {
          on: {
            下一轮: {
              target: "展示题目",
              actions: assign({
                questionCount: 0,
                correctCount: 0,
              })
            },
            切换到考试模式: "#词汇学习机器人.考试模式",
            返回主菜单: "#词汇学习机器人.初始界面",
          }
        }
      },
    },
    考试模式: {
      initial: "展示题目",
      entry: assign({
        questionCount: 0,
        correctCount: 0,
      }),
      states: {
        展示题目: {
          on: {
            回答问题: [
              {
                target: "处理下一步",
                cond: "答案正确",
                actions: assign({
                  correctCount: (context) => context.correctCount + 1,
                  questionCount: (context) => context.questionCount + 1,
                })
              },
              {
                target: "处理下一步",
                actions: assign({
                  questionCount: (context) => context.questionCount + 1,
                })
              }
            ]
          },
        },
        处理下一步: {
          always: [
            { target: "显示成绩反馈", cond: (context) => context.questionCount >= 10 },
            { target: "展示题目" }
          ]
        },
        显示成绩反馈: {
          on: {
            下一轮: {
              target: "展示题目",
              actions: assign({
                questionCount: 0,
                correctCount: 0,
              })
            },
            切换到学习模式: "#词汇学习机器人.学习模式",
            返回主菜单: "#词汇学习机器人.初始界面",
          }
        }
      },
    },
  },
});
