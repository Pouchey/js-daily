"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const sqlite3_1 = require("sqlite3");
const dbPath = 'data/threads.db';
const createTable = async (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS threads (
    channelID TEXT PRIMARY KEY NOT NULL,
    questionNumber INTEGER NOT NULL,
    UNIQUE(channelID)
  )`, (err) => {
        if (err)
            throw err;
    });
    db.run(`CREATE TABLE IF NOT EXISTS answers (
    userID TEXT NOT NULL,
    channelID TEXT NOT NULL,
    questionNumber INTEGER NOT NULL,
    answer TEXT NOT NULL,
    isCorrect BOOLEAN NOT NULL,
    UNIQUE(userID, channelID, questionNumber),
    FOREIGN KEY (channelID) REFERENCES threads (channelID)
  )`, (err) => {
        if (err)
            throw err;
    });
};
const registerChannel = async (db, channelID) => {
    db.run(`INSERT INTO threads (channelID, questionNumber) VALUES (?, ?)`, [channelID, 0], (err) => {
        if (err)
            throw err;
    });
};
const getChannel = async (db, channelID) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM threads WHERE channelID = ?`, [channelID], (err, row) => {
            if (err)
                reject(err);
            resolve(row);
        });
    });
};
const getActiveChannels = async (db) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM threads`, (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
};
const deleteChannel = async (db, channelID) => {
    db.run(`DELETE FROM threads WHERE channelID = ?`, [channelID], (err) => {
        if (err)
            throw err;
    });
};
const updateQuestionNumber = async (db, channelID, questionNumber) => {
    db.run(`UPDATE threads SET questionNumber = ? WHERE channelID = ?`, [questionNumber, channelID], (err) => {
        if (err)
            throw err;
    });
};
const updateAnswer = async (db, answer) => {
    db.run(`INSERT INTO answers (userID, channelID, questionNumber, answer, isCorrect) VALUES (?, ?, ?, ?, ?)`, [answer.userID, answer.channelID, answer.questionNumber, answer.answer, answer.isCorrect], (err) => {
        if (err)
            throw err;
    });
};
const getAnswer = async (db, channelID, questionNumber, userID) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM answers WHERE channelID = ? AND questionNumber = ? AND userID = ?`, [channelID, questionNumber, userID], (err, row) => {
            if (err)
                reject(err);
            resolve(row);
        });
    });
};
const initDB = () => {
    const db = new sqlite3_1.Database(dbPath, (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log('Connected to the threads database.');
        }
    });
    createTable(db);
    return {
        db,
        registerChannel: (channelID) => registerChannel(db, channelID),
        getChannel: (channelID) => getChannel(db, channelID),
        getActiveChannels: () => getActiveChannels(db),
        deleteChannel: (channelID) => deleteChannel(db, channelID),
        updateQuestionNumber: (channelID, questionNumber) => updateQuestionNumber(db, channelID, questionNumber),
        updateAnswer: (answer) => updateAnswer(db, answer),
        getAnswer: (channelID, questionNumber, userID) => getAnswer(db, channelID, questionNumber, userID)
    };
};
exports.initDB = initDB;
//# sourceMappingURL=db.js.map