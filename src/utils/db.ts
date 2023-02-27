import { Database } from 'sqlite3';
import { AnswerResponseType } from '../types/answer';
import { ChannelType } from '../types/channel';

const dbPath = 'data/threads.db';

const createTable = async (db: Database) => {
    db.run(
        `CREATE TABLE IF NOT EXISTS threads (
    channelID TEXT PRIMARY KEY NOT NULL,
    questionNumber INTEGER NOT NULL,
    UNIQUE(channelID)
  )`,
        (err) => {
            if (err) throw err;
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS answers (
    userID TEXT NOT NULL,
    channelID TEXT NOT NULL,
    questionNumber INTEGER NOT NULL,
    answer TEXT NOT NULL,
    isCorrect BOOLEAN NOT NULL,
    UNIQUE(userID, channelID, questionNumber),
    FOREIGN KEY (channelID) REFERENCES threads (channelID)
  )`,
        (err) => {
            if (err) throw err;
        }
    );
};

const registerChannel = async (db: Database, channelID: string) => {
    db.run(
        `INSERT INTO threads (channelID, questionNumber) VALUES (?, ?)`,
        [channelID, 0],
        (err) => {
            if (err) throw err;
        }
    );
};

const getChannel = async (db: Database, channelID: string): Promise<ChannelType | null> => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM threads WHERE channelID = ?`, [channelID], (err, row) => {
            if (err) reject(err);
            resolve(row as ChannelType);
        });
    });
};

const getActiveChannels = async (db: Database): Promise<ChannelType[] | null> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM threads`, (err, rows) => {
            if (err) reject(err);
            resolve(rows as ChannelType[]);
        });
    });
};

const deleteChannel = async (db: Database, channelID: string) => {
    db.run(`DELETE FROM threads WHERE channelID = ?`, [channelID], (err) => {
        if (err) throw err;
    });
};

const updateQuestionNumber = async (db: Database, channelID: string, questionNumber: number) => {
    db.run(
        `UPDATE threads SET questionNumber = ? WHERE channelID = ?`,
        [questionNumber, channelID],
        (err) => {
            if (err) throw err;
        }
    );
};

const updateAnswer = async (db: Database, answer: AnswerResponseType) => {
    db.run(
        `INSERT INTO answers (userID, channelID, questionNumber, answer, isCorrect) VALUES (?, ?, ?, ?, ?)`,
        [answer.userID, answer.channelID, answer.questionNumber, answer.answer, answer.isCorrect],
        (err) => {
            if (err) throw err;
        }
    );
};

const getAnswer = async (
    db: Database,
    channelID: string,
    questionNumber: number,
    userID: string
): Promise<AnswerResponseType | null> => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM answers WHERE channelID = ? AND questionNumber = ? AND userID = ?`,
            [channelID, questionNumber, userID],
            (err, row) => {
                if (err) reject(err);
                resolve(row as AnswerResponseType);
            }
        );
    });
};

const getScoreboard = async (
    db: Database,
    channelID: string
): Promise<AnswerResponseType[] | null> => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM answers WHERE channelID = ?`, [channelID], (err, rows) => {
            if (err) reject(err);
            resolve(rows as AnswerResponseType[]);
        });
    });
};

export const initDB = () => {
    const db = new Database(dbPath, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Connected to the threads database.');
        }
    });

    createTable(db);

    return {
        db,
        registerChannel: (channelID: string) => registerChannel(db, channelID),
        getChannel: (channelID: string) => getChannel(db, channelID),
        getActiveChannels: () => getActiveChannels(db),
        deleteChannel: (channelID: string) => deleteChannel(db, channelID),
        updateQuestionNumber: (channelID: string, questionNumber: number) =>
            updateQuestionNumber(db, channelID, questionNumber),
        updateAnswer: (answer: AnswerResponseType) => updateAnswer(db, answer),
        getAnswer: (channelID: string, questionNumber: number, userID: string) =>
            getAnswer(db, channelID, questionNumber, userID),
        getScoreboard: (channelID: string) => getScoreboard(db, channelID)
    };
};
