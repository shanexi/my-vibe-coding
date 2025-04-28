import { createMachine, assign } from 'xstate';

// Define placeholder types and utility functions first
// You'll need to replace these with your actual data structures and logic

// 表示一个词汇条目
type Word = {
  id: string;
  japanese: string;
  chinese: string;
};

// 状态机的上下文（扩展状态）
type VocabularyContext = {
  currentWord: Word | null;  // 当前展示的词
  options: string[];        // 当前词的选项列表（包含正确答案和干扰项）
  feedback: string | null;  // 用户反馈信息
  errorCount: number;       // 错误计数
  // 标记需要在当前题目完成后切换到的目标状态
  pendingTransitionTarget: '初始界面' | '学习模式' | '考试模式' | null;
};

// 所有可能的事件类型
type VocabularyEvent =
  | { type: '开始学习' }
  | { type: '开始考试' }
  | { type: '回答问题'; answer: string }  // 用户选择的答案
  | { type: '跳过' }                      // 仅限学习模式
  | { type: '重新作答' }                  // 仅限学习模式下答错后
  | { type: '下一题' }                    // 学习模式下答错后继续
  | { type: '切换到学习模式' }
  | { type: '切换到考试模式' }
  | { type: '返回主菜单' };

// --- Placeholder Implementations (Replace with your actual logic) ---

// Dummy word list
const wordList: Word[] = [
  { id: '1', japanese: '猫', chinese: '猫' },
  { id: '2', japanese: '犬', chinese: '狗' },
  { id: '3', japanese: '魚', chinese: '鱼' },
  { id: '4', japanese: '鳥', chinese: '鸟' },
];

// Dummy function to get the next word
function getNextWord(context: VocabularyContext): Word {
  console.log("Getting next word...");
  const currentIndex = wordList.findIndex(w => w.id === context.currentWord?.id);
  // Simple sequential logic for now
  const nextIndex = (currentIndex + 1) % wordList.length;
  return wordList[nextIndex];
}

// Dummy function to generate multiple choice options
function generateOptions(word: Word | null): string[] {
  console.log("Generating options...");
  if (!word) return [];
  // Example: Get 3 random distractors from the list (excluding the correct answer)
  const distractors = wordList
    .filter(w => w.id !== word.id)
    .map(w => w.chinese)
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, 3);
  const options = [word.chinese, ...distractors].sort(() => Math.random() - 0.5); // Shuffle correct answer in
  return options.slice(0, 4); // Ensure 4 options
}

// Function to check if the answer is correct
function checkAnswer(context: VocabularyContext, event: Extract<VocabularyEvent, { type: '回答问题' }>): boolean {
  return event.answer === context.currentWord?.chinese;
}

// --- XState Machine Definition ---

export const vocabularyMachine = createMachine<VocabularyContext, VocabularyEvent>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SFnow4jaDNtQBnKC5zQFmqC65AOkFwlQac1AZV0CN0gYkAB9UrAbQAYBdRUABwHtYBLAC59uAOw4gAHogBMARgCshAJwAWeQGZZADg2b1zeQHYANCACeiAGxathddOYHm6wypWGt0gL5fTaLHhEZFR0pIDAAYCr0SzsSCA8-EKi4lII0tKKqhraurL6RqYWqZZKhM6GzJ5K+kqy7j5+GDgEhFiAhFaA8PqEgKo6gFyegBkZgHdu1IB7aoAq3oB3qX3R4vGCwmKxKZYqloTymYZG0uoqOwWIWiqyhFrl6lValusVsvUg-k1EbZ29gyMTU7IxXLxzSYtWWTHIzWZiyZgqaRKeQKfYIIGOQhuWRKSzMVHOKFKO4PQItTAdbr9IaAZ9jAOPx01is0SC1ASyBa0MoPBkOhsPMVnUimsqjk6y06nO8hxjTxzyJb0A4EqAI2NAAxKkQ6lJ+CXmyUQR2YhGkllk5WcOgUlnScNUqy0tV1siNhlc0i0IoCzXFryGgBX44aAbjlADvBgFVlJVxX40tUIDVanV69QG+RG+Rwg1rc7ItHbFEOx74wku6gy2XPf3U1UAkO1QhM9TLGFHQzl6RwzarbXuIEgrRstNigmdQB8Zj1AMbWgDsPQCzyoAIzOo+cDhbpiHB8mkWpUFUsTJWMLScecjKrup1s4q7adncIPcAmKmAe+iR9RALOJgAbTQA68qNxyr-lOEIZ0nYakpmOl5FXLnCZ01HVlkhdFlkuQx9yeQ8T3PUdAGg5QAAOSmNgZgnZ9JGnAw52kBcIOWK5ZDXDl4XBOdVBRNEMXsJRsV8e5RQPQlYIvHMFXaR8-lpTCEEuFQ7FqSEl2KNwdBNQwSlAlRaKIwUmTohpHWg5iejPC93W9P1UKpdDuJSPiBLcbV5NE2MSJsfjahBL8lAkjQoIzTpABBNQAwFyQwBTazHbTlS44MXEUbVdUcSMYWjY0SKIhRSlqOQrS5co0gc8VXI8scvjQp89OnSNbHLQwFEuXVzR1Os3xOFxwybL9tCSw8UsQzzGGkb4A0y4MZxwvDhJXIjaxI6T+K0CErk8GwKhhBz2IlIYxkmTigyLbQKjWbZdmRHZXBMEiQK1Ky9UhfLo0miJM2JbM5TzbzWt8xbLBcLUKkFfzowklQ4VnQwEyIiFtCraFjtOt4NN9ebJx4uLPocAU5PkF7VDhXYcOjdwjnkU5YcsAGXjOtiTo4q6CwwlIrSOUsyI8Vd0iqOFBVWJRzVcI4ns0VwsaPHoL1BomZGYVxypRBmVGKt7tusJFzlG1FcJWbx6NxZopvqxqCd04M0gyNRNB0QVcmYSwALtQgFBTKW9eTYU5cYohFbchq0pawmsoQfywyC-VQpjACuUUVtW1cTJoWsNmlbHZqMpul8HD5gUBd1IWSfejcaKGpd7BWIifHokRuAgOBxHl-Bw4Wl8AFp9ZIkuMlo6ua+rowHOCSgi7BlJIQA+RNXcexPCXfKlyF2qOmb7nnaNV2IyjT3+t5pFBaZp7dUH7HBmHp2jlWNwrhqNxXBscvChZT6KlbMErk0SxiiX9mBxHVfg0OT6zkXWGwQkpRStsHuPAvhFQqvljhx3yLA-Uszhn4d11LRACvMSjFFnFCWoY09yWyUo5QgSsgEvl6vxCq+g7S7A7loOstEThKHSOiZEb4VBY0weDNGJQoZPU2HDEWhRcKwLRpUWyOgPD2DZi6WhxNljqA-PYXC5ohpAi2oUa0JwDBVFAtRahKD0xTR7LfHSbVFoYhOEccE1gO7gT6jIpcRteYKFsucIis5g623coImQ2w6b9ytJkCx+8rA6hWrDdI5QPColuJnIAA */
    id: '词汇学习机器人',
    initial: '初始界面',
    context: {
      currentWord: null,
      options: [],
      feedback: '加载中...', 
      errorCount: 0,
      pendingTransitionTarget: null,
    },
    entry: '初始化上下文',
    states: {
      初始界面: {
        entry: assign({ feedback: '欢迎！请选择模式：学习模式或考试模式' }),
        on: {
          开始学习: { target: '学习模式', actions: ['加载首题', '清除待切换标记'] },
          开始考试: { target: '考试模式', actions: ['加载首题', '清除待切换标记'] },
        },
      },
      学习模式: {
        initial: '展示题目',
        states: {
          展示题目: {
            entry: assign({ feedback: null }), 
            on: {
              回答问题: [
                { cond: '答案正确', target: '显示正确反馈' },
                { target: '显示错误反馈' },
              ],
              跳过: { target: '处理下一步', actions: '设置跳过反馈' },
              切换到考试模式: { actions: '设置待切换到考试' },
              返回主菜单: { actions: '设置待返回主菜单' },
              切换到学习模式: { actions: '清除待切换标记' },
            },
          },
          显示正确反馈: {
             entry: '设置正确反馈',
             always: '处理下一步',
          },
          显示错误反馈: {
            entry: '设置错误反馈',
            on: {
              重新作答: '展示题目',
              下一题: '处理下一步',
              切换到考试模式: { actions: '设置待切换到考试' },
              返回主菜单: { actions: '设置待返回主菜单' },
            }
          },
          处理下一步: {
              always: [
                { target: '#词汇学习机器人.初始界面', cond: '应该返回主菜单', actions: '准备状态切换' },
                { target: '#词汇学习机器人.考试模式', cond: '应该切换到考试', actions: '准备状态切换' },
                { target: '展示题目', actions: '准备下一题' }
              ]
          }
        }
      },
      考试模式: {
        initial: '展示题目',
         states: {
           展示题目: {
             entry: assign({ feedback: null }),
             on: {
               回答问题: { target: '显示反馈', actions: '准备答案反馈' },
               切换到学习模式: { actions: '设置待切换到学习' },
               返回主菜单: { actions: '设置待返回主菜单' },
               切换到考试模式: { actions: '清除待切换标记' },
             },
           },
           显示反馈: {
             always: '处理下一步',
           },
           处理下一步: {
              always: [
                { target: '#词汇学习机器人.初始界面', cond: '应该返回主菜单', actions: '准备状态切换' },
                { target: '#词汇学习机器人.学习模式', cond: '应该切换到学习', actions: '准备状态切换' },
                { target: '展示题目', actions: '准备下一题' }
              ]
           }
         }
      },
    },
  },
  {
    actions: {
      初始化上下文: assign((_) => ({
        currentWord: null,
        options: [],
        feedback: '欢迎！请选择模式。',
        errorCount: 0,
        pendingTransitionTarget: null,
      })),
      加载首题: assign((context) => {
        const nextWord = getNextWord(context);
        const options = generateOptions(nextWord);
        return {
          currentWord: nextWord,
          options: options,
          feedback: null,
          pendingTransitionTarget: null,
        };
      }),
      准备下一题: assign((context) => {
          const nextWord = getNextWord(context);
          const options = generateOptions(nextWord);
          return {
            ...context,
            currentWord: nextWord,
            options: options,
            feedback: null,
            pendingTransitionTarget: null
          };
      }),
      准备状态切换: assign((context) => {
          const target = context.pendingTransitionTarget;
          const isGoingToIdle = target === '初始界面';

          let nextWord = context.currentWord;
          let options = context.options;
          let feedback: string | null = null;

          if (isGoingToIdle) {
              nextWord = null;
              options = [];
          } else {
              nextWord = getNextWord(context);
              options = generateOptions(nextWord);
          }

          return {
              ...context,
              currentWord: nextWord,
              options: options,
              feedback: feedback,
              pendingTransitionTarget: null
          };
      }),
      设置正确反馈: assign({ feedback: '回答正确！' }),
      设置错误反馈: assign({
          feedback: (context) => `回答错误。正确答案是：${context.currentWord?.chinese}。\n你可以选择重新作答，或者点击下一题继续。`,
          errorCount: (context) => context.errorCount + 1
      }),
      设置跳过反馈: assign({ feedback: '已跳过。' }),
      准备答案反馈: assign((context, event) => {
        if (event.type !== '回答问题') return {};
        if (checkAnswer(context, event)) {
          return { feedback: '回答正确！' };
        } else {
          return {
              feedback: `回答错误。正确答案是：${context.currentWord?.chinese}。`,
              errorCount: context.errorCount + 1
          };
        }
      }),
      设置待返回主菜单: assign({ pendingTransitionTarget: '初始界面' as const }),
      设置待切换到学习: assign({ pendingTransitionTarget: '学习模式' as const }),
      设置待切换到考试: assign({ pendingTransitionTarget: '考试模式' as const }),
      清除待切换标记: assign({ pendingTransitionTarget: null }),
    },
    guards: {
      答案正确: (context, event) => {
        if (event.type !== '回答问题') return false;
        return checkAnswer(context, event);
      },
      应该返回主菜单: (context) => context.pendingTransitionTarget === '初始界面',
      应该切换到学习: (context) => context.pendingTransitionTarget === '学习模式',
      应该切换到考试: (context) => context.pendingTransitionTarget === '考试模式',
    },
  }
);