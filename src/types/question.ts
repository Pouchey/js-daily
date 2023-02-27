export type AnswerType = {
  letter: string,
  text: string,
}
  

export type QuestionType = {
  questionNumber: number,
  questionTitle: string,
  questionContent: string,
  answers: AnswerType[],
  bestAnswer: AnswerType,
}

