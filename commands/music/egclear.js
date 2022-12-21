const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egclear')
        .setDescription('Clear the queue'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        const queue = await client.player.getQueue(interaction.guild);

        try {
            queue.clear();
        } catch {
            return interaction.reply('I\'m not playing music !');
        }

        interaction.reply('The queue has been cleared !');
    }
}