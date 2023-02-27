"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'ready',
    once: true,
    execute: (client) => {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};
//# sourceMappingURL=ready.js.map