const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egresume')
        .setDescription('Resume the music'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        const queue = await client.player.getQueue(interaction.guild);

        try {
            queue.setPaused(false);
        } catch {
            return interaction.reply('I\'m not playing music !');
        }

        interaction.reply('The music has been resumed !');
    }
}