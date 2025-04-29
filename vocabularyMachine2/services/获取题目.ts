import { Protocol, Service } from "../../vocabularyMachine2";

export const 获取题目: Service<Protocol, "获取题目"> = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    question: "What is the capital of France?",
    answer: "Paris",
  };
};
