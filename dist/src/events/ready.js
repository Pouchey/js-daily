"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
exports.default = {
    name: 'ready',
    once: true,
    execute: (client) => {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
        // every day at 9:00:00 AM
        node_cron_1.default.schedule('0 9 * * *', () => {
            console.log('running a task every day at 9:00:00 AM');
        });
    },
};
//# sourceMappingURL=ready.js.map