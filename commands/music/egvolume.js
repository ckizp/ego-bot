const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { Queue, Player } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egvolume')
        .setDescription('Set a new volume to the bot')
        .addIntegerOption((option) => option.setName('volume').setDescription('new volume')),
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */    
    async execute(interaction) {
        await interaction.deferReply();
        const volume = interaction.options.getInteger('volume');

        const queue = client.player.getQueue(interaction.guild);

        if (!volume) return interaction.editReply(`Actual volume : ${queue.volume}`);

        if (volume === queue.volume) return interaction.editReply('The bot is already set to this volume !');

        interaction.editReply(((queue.setVolume(volume)) ? ('The volume of the bot has been modified !') : ('Error while changing the volume')));
    }
}