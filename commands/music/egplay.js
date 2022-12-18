const { SlashCommandBuilder, ChatInputCommandInteraction, Client, GuildVoiceStates } = require('discord.js');
const { QueryType } = require ('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egplay')
        .setDescription('play song')
        .addStringOption((option) => option.setName('song').setDescription('the song you want to play').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */
    async execute(interaction) {
        await interaction.deferReply();
        const song = interaction.options.getString('song'); 

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            leaveOnEnd: true,
            initialVolume: 60,
            spotifyBridge: true
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return interaction.editReply({content: `Don't have the permission to join ${interaction.member.voice.channel}`, ephemeral: true});
        }
        
        const track = await player.search(song, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        }).then(x => x.tracks[0]);

        if (!track) {
            return interaction.editReply({content: `Song '${song}' not found`, ephemeral: true});
        }
        
        await interaction.editReply(`Loading your ${track.playlist ? 'playlist' : 'track'}`);

        if (!queue.playing) await queue.play(track);
    }
}