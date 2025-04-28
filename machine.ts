import { createMachine, assign } from 'xstate';

// Define placeholder types and utility functions first
// You'll need to replace these with your actual data structures and logic

// Represents a vocabulary word
type Word = {
  id: string;
  japanese: string;
  chinese: string;
};

// The machine's context (extended state)
type VocabularyContext = {
  currentWord: Word | null;
  options: string[]; // Array of potential Chinese translations (including correct one)
  feedback: string | null; // Message to show the user (e.g., feedback, instructions)
  errorCount: number; // Example: Track errors in a session
  // Flag to handle transitions that should happen after the current question cycle
  pendingTransitionTarget: 'idle' | 'learning' | 'testing' | null;
};

// All possible events the machine can react to
type VocabularyEvent =
  | { type: 'START_LEARNING' }
  | { type: 'START_TESTING' }
  | { type: 'ANSWER'; answer: string } // User provides the chosen Chinese translation
  | { type: 'SKIP' } // Specific to learning mode
  | { type: 'RETRY_INCORRECT' } // Specific to learning mode after incorrect answer
  | { type: 'NEXT_QUESTION' } // Event to move forward after incorrect feedback in learning mode
  | { type: 'SWITCH_TO_LEARNING' }
  | { type: 'SWITCH_TO_TESTING' }
  | { type: 'RETURN_TO_MENU' };

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
function checkAnswer(context: VocabularyContext, event: Extract<VocabularyEvent, { type: 'ANSWER' }>): boolean {
  return event.answer === context.currentWord?.chinese;
}

// --- XState Machine Definition ---

export const vocabularyMachine = createMachine<VocabularyContext, VocabularyEvent>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDcD2BjAhgIwK4BtMAnATwCFUAXAOgEsJ8wBiAZQBUBBAJTYH0AZAKLcAcgEkRAcQDaABgC6iUAAdUsWpVqoAdkpAAPRACYAjAFZqATgAsZgMwnZRy+aN3LAGhAlEANgAc-tR2RrKylrJ2TrLWRkYAvvFeaFh4hKQUNPSMrJw8vGyC7BIyCnqq6po6eoYIcRY29o7Oru5ePnW+ltSRAOyOvXa9lr7W5onJGDgExORU1IzE2rTaUNSwABaoAO4rUACKuHBV2kwcIiwA6oJccopIIBUaWroPtb1GvtQmw769gWYYpZemZ2oh-E4eoMzDDYb1RgkkiAUtN0nMaIsiMtVustrtVodji8zhdrrcTPcVGpntU3n4AtQYUZrCFnGYTNZwmCECYTHYLIMTEYYRFZGZrCyJsipmlZpkFmAlntcTs9oTYCdWABpMQABTu5WpJxqiA+Xx+I3+-kB1mBoO8fn51ACNlsJgiZmBvSlKNlGXmmOxa02qoJRw1xKuYjYAGEABIFADyBSKbBKBoeT2NdIQtl61HhPz5Zg+5kG3JsX38HNMnt8bhG1h9Mpm-oxiqxypD+IO4c1XEEbAAqlwREneABZQQiIcZqmVF4m3MMoz+YW21d84EjbnWkyM9zWNdWmymZupVvohVKnHdtV9yOXaPx8dCUTpsqZo2LnPWetWIZbWsQZLH8D1uRBL5PmA21fHMI9-HPVE5QDDsgxVHsADEwEgbBMHQABrJg50eb9aVAWohT+AtInCBxLBGatel3SJGV6WIxUsIZhjMRCkV9S95UDLs8T2MRtHQVAiCIMB0EobDcPwoiBzYLgAE1eAkGNEy4AcYzYEisx-CjwTCAD-H+fpPSiOx-G5RxAWdExfEBRpLBhPkkL9K9hNvUTVnEyTpNk+ScIgPDCKYERBAADT4fYh1TMRExEQyyNeEyeU+fNelorj3UYn57OaKwONXDjwgsrzBNQm9g38qBAqkmS5IU8KlNYJ9YwTNhk0KYopDShdyIMRBHB+KxcqcUZenhDyK2GagOI8v81zFaq0SEtCRNDRqJOakK2oi5TBxHMdesnadZ0-ecaQy0aeScIJbVkfx6xMN6wN43d-Gsb5bGrNcbBBV6NpQ9s6uoZQiAwOB1FWYibtI4b7tqWIjALOD+n5UsSzsezax6GsXHMCJrV8MG22vTscWh2HYHhqBiIpQ0UaXZzHL+D63HK1cYggj5qH8IZfDgly+g+SmfO22mYfQOG9mIoxKWRu72eymionyhiAiKh1cxsIWYgCWR3Wc02zAp-iW02+ZKCJPzdvVTVziuG4hrVnNTHY744MPTk+b5blRj+0w-0iYFnOhKX5XtiNHZ7Z3H2fHrkzfUcPxVoyRsoywjHzEVhZhGJ7F8bkzHzg8hTsGyGPcq3JgvW2aDjzQE-vIkdCYFSzvHKcZw97NMvdWJvg+VanCGQ9uRZDHhVGBi3pcsYzBju2Hfqp2Hy7qNuvHfq00GpHs9RsbT0ZUCwNm5eRntDoa6+UCflFroogsuw15bjeML2I6OsH4yD1hS-WCFEZedhbCi3xvrUWz13BvQ5L4C2b1P7UFbsqOm8sGaKwATnYwwpSpNCcC4CutkCZBFaLEWyshRjij4o3ZCVN0Gy3pozZmWd0pLnRpjIsONazln1sWCwYEPRwV4q9cY1sm7gzQd-TBCsEbSGVqzT2mVgF-RrjQ8UEDLa+GgR0QEdhgjOGFlfbK7FEhIm0KgCAcA9ACWbiooeD0AC0Zd9ZuJ6GEJ69gJTuXzpIhh3l5TZDAE4wBaMjD2UcsBTRSDCyWw-lIxh0s6rhLwbmcIPDsYln4foxAnJ8xHmcsLdiS9LCoN8pvRO297ony4W9JanJHB2DgnnRJ9kYj5lemBW0xZrSREqTLapv8wrHXSafR6r1nSl1CDXT0DEBZBDXLrH4s0QjASGZDO8AV9rBVamMpSEz2ZhC+DfYUkR3ABGYoI2Qi0ugV1+qMDmXEtk0zWPI7Bqxjk5g5NWb4+cRQ41+h9CCDEhbtNFs5JBsRV7JOCeveOUAfnDwst0Qu-IbSl25MyboLlAheltPyMUSSgk1S-kin+YZO51M4b8kYshQFhDiK00ms1g6VwhHWd6EDbT0OlNIph38dlQD-oRFFQD4HGPgmUj4rT8kIFFvmAYFphYQJiE2eF5LZGUs+YzCVtR84WQLB5UIhi1z8mDnBRkwpeLOAuePSx8QgA */
    id: 'vocabularyBot',
    initial: 'idle',
    // Define initial context structure
    context: {
      currentWord: null,
      options: [],
      feedback: 'Loading...', // Initial message
      errorCount: 0,
      pendingTransitionTarget: null,
    },
    // Set the actual initial context values
    entry: 'assignInitialContext',
    states: {
      idle: {
        entry: assign({ feedback: 'Welcome! Choose a mode.' }),
        on: {
          // Transitions to start modes, loading the first question
          START_LEARNING: { target: 'learning', actions: ['loadFirstQuestion', 'clearPendingTransition'] },
          START_TESTING: { target: 'testing', actions: ['loadFirstQuestion', 'clearPendingTransition'] },
        },
      },
      learning: {
        initial: 'showingQuestion',
        states: {
          // State where the user sees the question and options
          showingQuestion: {
            entry: assign({ feedback: null }), // Clear feedback for new question
            on: {
              ANSWER: [
                // If correct, go show feedback
                { cond: 'isAnswerCorrect', target: 'showingFeedback' },
                // If incorrect, go show specific incorrect feedback state
                { target: 'showingIncorrectFeedback' },
              ],
              // Skip goes directly to processing the next step
              SKIP: { target: 'processing', actions: 'setSkippedFeedback' },
              // Mode switch/return events just set a flag, handled in 'processing' state
              SWITCH_TO_TESTING: { actions: 'setPendingTransitionTesting' },
              RETURN_TO_MENU: { actions: 'setPendingTransitionIdle' },
              // Ignore requests to switch to the current mode
              SWITCH_TO_LEARNING: { actions: 'clearPendingTransition' },
            },
          },
          // State after a correct answer or skip
          showingFeedback: {
             entry: 'setCorrectFeedback', // Set feedback message
             always: 'processing', // Immediately move to process the next step
          },
          // State after an incorrect answer, allowing retry
          showingIncorrectFeedback: {
            entry: 'setIncorrectFeedback', // Set feedback, potentially offer retry
            on: {
              // Go back to the *same* question without loading a new one
              RETRY_INCORRECT: 'showingQuestion',
              // User chooses to move on after seeing incorrect feedback
              NEXT_QUESTION: 'processing',
              // Still allow setting transition intent while viewing feedback
              SWITCH_TO_TESTING: { actions: 'setPendingTransitionTesting' },
              RETURN_TO_MENU: { actions: 'setPendingTransitionIdle' },
            }
          },
          // Transient state to check for pending mode switches or load the next question
          processing: {
              always: [
                // Prioritize pending transitions
                { target: '#vocabularyBot.idle', cond: 'shouldGoToIdle', actions: 'prepareTransition' },
                { target: '#vocabularyBot.testing', cond: 'shouldGoToTesting', actions: 'prepareTransition' },
                // Otherwise, stay in learning mode and load the next question
                { target: 'showingQuestion', actions: 'prepareNextQuestion' }
              ]
          }
        }
      },
      testing: {
        initial: 'showingQuestion',
         states: {
           // State where user sees the question and options in test mode
           showingQuestion: {
             entry: assign({ feedback: null }), // Clear feedback
             on: {
               // Provide feedback immediately after answer
               ANSWER: { target: 'showingFeedback', actions: 'prepareAnswerFeedback' },
               // Mode switch/return just set flags
               SWITCH_TO_LEARNING: { actions: 'setPendingTransitionLearning' },
               RETURN_TO_MENU: { actions: 'setPendingTransitionIdle' },
               // Ignore requests to switch to the current mode
               SWITCH_TO_TESTING: { actions: 'clearPendingTransition' },
             },
           },
           // State after showing feedback in test mode
           showingFeedback: {
             always: 'processing', // Immediately move to process next step
           },
           // Transient state for processing next step in testing mode
           processing: {
              always: [
                // Prioritize pending transitions
                { target: '#vocabularyBot.idle', cond: 'shouldGoToIdle', actions: 'prepareTransition' },
                { target: '#vocabularyBot.learning', cond: 'shouldGoToLearning', actions: 'prepareTransition' },
                // Otherwise, stay in testing mode and load next question
                { target: 'showingQuestion', actions: 'prepareNextQuestion' }
              ]
           }
         }
      },
    },
  },
  // --- Action and Guard Implementations ---
  {
    actions: {
      assignInitialContext: assign((_) => ({
        currentWord: null,
        options: [],
        feedback: 'Welcome! Choose a mode.',
        errorCount: 0,
        pendingTransitionTarget: null,
      })),
      // Loads the very first question when entering a mode
      loadFirstQuestion: assign((context) => {
        const nextWord = getNextWord(context); // Get initial word
        const options = generateOptions(nextWord);
        return {
          currentWord: nextWord,
          options: options,
          feedback: null, // Clear welcome message
          pendingTransitionTarget: null, // Ensure flag is clear
        };
      }),
      // Prepares context for the *next* question within the *same* mode
      prepareNextQuestion: assign((context) => {
          const nextWord = getNextWord(context);
          const options = generateOptions(nextWord);
          return {
            ...context, // Keep existing context like errorCount
            currentWord: nextWord,
            options: options,
            feedback: null, // Clear feedback for new question
            pendingTransitionTarget: null // Ensure flag is clear
          };
      }),
       // Prepares context for transitioning to a *different* mode (or idle)
      prepareTransition: assign((context) => {
          const target = context.pendingTransitionTarget;
          const isGoingToIdle = target === 'idle';

          let nextWord = context.currentWord;
          let options = context.options;
          let feedback: string | null = null; // Default to null feedback

          if (isGoingToIdle) {
              // Clear data for idle state
              nextWord = null;
              options = [];
              // Feedback will be set by idle state's entry action
          } else {
              // Load data for the target mode (learning/testing)
              nextWord = getNextWord(context); // Or get specific first word for the mode?
              options = generateOptions(nextWord);
          }

          return {
              ...context,
              currentWord: nextWord,
              options: options,
              feedback: feedback,
              pendingTransitionTarget: null // Crucial: Clear the flag after processing
          };
      }),
      setCorrectFeedback: assign({ feedback: 'Correct!' }),
      // Provides feedback and potentially hint/correct answer for incorrect guesses
      setIncorrectFeedback: assign({
          feedback: (context) => `Incorrect. The correct answer was: ${context.currentWord?.chinese}. Choose RETRY or NEXT.`,
          errorCount: (context) => context.errorCount + 1 // Increment error count
      }),
      setSkippedFeedback: assign({ feedback: 'Skipped.' }),
       // Sets feedback based on answer correctness in testing mode
      prepareAnswerFeedback: assign((context, event) => {
        if (event.type !== 'ANSWER') return {}; // Should not happen
        if (checkAnswer(context, event)) {
          return { feedback: 'Correct!' };
        } else {
          return {
              feedback: `Incorrect. The correct answer was: ${context.currentWord?.chinese}.`,
              errorCount: context.errorCount + 1 // Increment errors in test mode too
          };
        }
      }),
      // Actions to set the pending transition target flag
      setPendingTransitionIdle: assign({ pendingTransitionTarget: 'idle' as const }),
      setPendingTransitionLearning: assign({ pendingTransitionTarget: 'learning' as const }),
      setPendingTransitionTesting: assign({ pendingTransitionTarget: 'testing' as const }),
      // Action to clear the flag (e.g., if user cancels switch or switches to current mode)
      clearPendingTransition: assign({ pendingTransitionTarget: null }),
    },
    guards: {
      // Checks if the provided answer is correct
      isAnswerCorrect: (context, event) => {
        // Type guard needed because this can be called from non-ANSWER events in some logic flows
        if (event.type !== 'ANSWER') return false;
        return checkAnswer(context, event);
      },
      // Guards to check the pending transition target flag
      shouldGoToIdle: (context) => context.pendingTransitionTarget === 'idle',
      shouldGoToLearning: (context) => context.pendingTransitionTarget === 'learning',
      shouldGoToTesting: (context) => context.pendingTransitionTarget === 'testing',
    },
  }
);