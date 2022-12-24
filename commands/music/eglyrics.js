const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eglyrics')
        .setDescription('Get the lyrics of the current music !'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();

        const queue = await client.player.getQueue(interaction.guild);

        const response = await fetch('https://api.audd.io/findLyrics/?' +
        'api_token=' + 'f808aedca9ec8ba6615b0899f1dab4e9' +
        '&q=' + queue.nowPlaying().title);

        //.toLowerCase().replaceAll('official', '').replaceAll('video', '').replaceAll('music', '').replaceAll('clip', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '%20')

        const result = await response.json();

        str = result.result[0].lyrics; 
        size = 2000;

        const numChunks = Math.ceil(str.length / size)

        for (let i = 0, c = 0; i < numChunks; ++i, c += size) {
            interaction.channel.send(str.substr(c, size));
        }

        interaction.editReply(`**Lyrics of ${queue.nowPlaying().title.toLowerCase().replaceAll('official', '').replaceAll('video', '').replaceAll('music', '').replaceAll('clip', '').replaceAll('(', '').replaceAll(')', '')}**`);
    }
}

// ******************************************
// Using AudD Music Recognition API
// API_KEY : f808aedca9ec8ba6615b0899f1dab4e9
// Accessible from https://dashboard.audd.io
// ******************************************