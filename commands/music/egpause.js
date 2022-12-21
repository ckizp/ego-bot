const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egpause')
        .setDescription('Pause the music'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        const queue = await client.player.getQueue(interaction.guild);

        try {
            queue.setPaused(true);
        } catch {
            return interaction.reply('I\'m not playing music !');
        }

        interaction.reply('The music has been paused !');
    }
}