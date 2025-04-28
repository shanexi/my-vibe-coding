import { createMachine, assign } from "xstate";

export const vocabularyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkFwlQac1AZV0CN0gYkAB9UrAbQAYBdRUABwHtYBLAC59uAOw4gAHogBMzAKyEAnABY5AZmbK10uQEZFc6QBoQAT0TLluwnIBsutQ7VqA7FqsuAvp5NoseIjIqOlJAYADAVeiWdiQQHn4hUXEpBGkdJVUNLR19QxNzFOZrFzU5F0VFXTllRXtlAA5vXwwcAkIsQEIrQHh9QkBVHUAuT0AMjMA7t2pAPbVAFW9AO9SBqPE4wWExGOS9F0JpZWK3e1tFNWVjM0Q65WZCQttXaRrlW1s63UaQPxaiDu7+4bGpmd1orl4C0Sy0Qq3Wm1ct10u32h3yijqCl00NK9TkD2RyieLwCbUwXV6gxGgGfYwDj8bMYvMEktQCtdGsNlsoTCDnlEC59IQXBy5IZoQd6dJsc1ce9CIA+Mz6gGNrQB2HoBZ5UAEZnUCkA+KLJLHRRrNS2VQue5aAz6tkIOq68HQtw1Ny8tTC-ytMWSwCYqYB76MV1EAs4mABtNADry4xVsUB1I1CEu1mYtmkajqCLj4ZNewU12RZuYdX1ugaPmeIsd+O6LvdSsA0HKAADkZmw5sH1SDTVrCDq9Qa1EbbImtI2XNJdgZ1PdHPbXniCYAQTUAYC7lwCm1sqq5Sa8DaYhkQjCNV09dFJGNDqTS5DOctTzZMwVEPRQXCBPp8q-tW1YvJJrtbrSi22ybbIVCPZdFYqrY3YZtmTQOm8l6SoACEaAJd+HrloAdvGBlStZLgguipNYvLdoosg4aolQmqodRrm4zAuJo0hmuR6jnvmBJQbBSqAOBKgBGxoADEoRF0SELjST5hnCy7cmo5xaPYdhajGzi0eB9F9DBHqACvxoyANxygA7wYAqsrcQ+vHJNIlTpOomjaHoBgCQg2jSIQf6InYGz2FqIG5mBhCcR8RLfNMWlAjpiCtsRGi4ZJZFWPsJo5Mo6yZpGpwqMwdo5jirSuYSXwTJ5d7ztpoZ+Y2zCBXUGhuA4yhhYiijnIUVR1Cc1ytkKCV5kQyXXmWM5eSGdb6sJVh7NoMbQhmLilWaJFmuiCK3HU6bSS54RjpOrW3v8QZZXWmyWdclFboUdQbGRQ1HGhDzCfcuh5ak6KIo5iVNXNhZyYx1AIe1KF8S4I1okBjgbHIeVhYBZxVDqlS7MUBXxaBw7JQxHqsWx7wvY+KxmbIsY2L9FQGH1NENc50MPYpKkaYjPkpGkKiGVkJm5IdDyNqkFR3KsRHeDmIjcBAcDiDd97eaGAC07aHYLFXMGL4sS3l12NSQFCULzHWoaytPCfS+j7FhDyFPVkMXl0CuvckjhnDotjqIiqNZn+JquNYlSphkBX9jNYqfEMBtI756LrHY5uGOmVslYd1QRfub7pn1Y22C7EHSvKCoe6T+7Ca4Op7RTZq6CaZqWVusY6HIWrlHsMeyW6iqJ6GyddmnMVEfYHbCVUZGUehGa8jrTnDmKLVTpXdZnbsa7lCcEcaKeah7r95wOKePayNI+qdzdI73fJCeZXzA-OJZk27Ke9Q6JPwdo5Yu16Y4FSIjNrn96henWI46FiyoBwGNbh2VDqjYVD21QlBraOuMoZ3RSu7Teis+I6HKk-E8r9rh6CDvkekmg1wFVnhbOqWJgG4magtPuEDDaIEuBFA4BUtAaAKnsJBy5qoRVbK2YouwpqL2wbrJKoCYYb1VFvVCsZtRanVgcHUOoDrIPIphek71LiRiXtg7wQA */
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
