const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egloop')
        .setDescription('Play the current music on loop')
        .addStringOption((option) => option.setName('mode').setDescription('Set a queue repeat mode').setRequired(true).addChoices(
            { name: 'OFF', value: 'OFF' },
            { name: 'TRACK', value: 'TRACK' },
            { name: 'QUEUE', value: 'QUEUE' }
        )),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        const mode = interaction.options.getString('mode');
        const queue = client.player.getQueue(interaction.guild);

        try {
            switch (mode) {
                case 'OFF':
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    break;
                case 'TRACK':
                    queue.setRepeatMode(QueueRepeatMode.TRACK);
                    break;
                case 'QUEUE':
                    queue.setRepeatMode(QueueRepeatMode.QUEUE);
                    break;
            }
        } catch {
            return interaction.reply('error');
        }

        interaction.reply('loop')
    }
}