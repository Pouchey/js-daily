export type AnswerResponseType = {
  userID: string;
  channelID: string;
  questionNumber: number;
  answer: string;
  isCorrect: boolean;
};