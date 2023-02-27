"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            await command.execute(interaction);
        }
        catch (error) {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};
//# sourceMappingURL=command.js.map