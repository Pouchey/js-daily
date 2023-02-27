import questions from '../../ressources/questions.json';
import { QuestionType } from '../types/question';

export const getQuestion = (id: number): QuestionType => {
    return questions.find((question) => question.questionNumber === id) || questions[0];
};

export const getNextQuestionId = (id: number): number => {
    if (id === 0) return 1;
    if (id === questions.length - 1) return 1;

    return id + 1;
};

export const getQuestionsSize = (): number => {
    return questions.length;
};
