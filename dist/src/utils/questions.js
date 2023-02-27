"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextQuestionId = exports.getQuestion = void 0;
const questions_json_1 = __importDefault(require("../../ressources/questions.json"));
const getQuestion = (id) => {
    return questions_json_1.default[id];
};
exports.getQuestion = getQuestion;
const getNextQuestionId = (id) => {
    if (id === 0)
        return 1;
    if (id === questions_json_1.default.length - 1)
        return 1;
    return id + 1;
};
exports.getNextQuestionId = getNextQuestionId;
//# sourceMappingURL=questions.js.map