const { SlashCommandBuilder, ChatInputCommandInteraction, GuildVoiceStates } = require('discord.js');
const { QueryType, Queue } = require ('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egplay')
        .setDescription('Play music')
        .addStringOption((option) => option.setName('query').setDescription('Music search query or link').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) return interaction.editReply('You must first be in a channel !');
        const query = interaction.options.getString('query'); 

        const queue = client.player.createQueue(interaction.guild, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0
            },
            metadata: interaction.channel,
            leaveOnEnd: true,
            initialVolume: 75,
            spotifyBridge: true
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return interaction.editReply({content: `Don't have the permission to join ${interaction.member.voice.channel}`, ephemeral: true});
        }

        const track = await client.player.search(query, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        if (!track) {
            return interaction.editReply({content: `Song '${query}' not found`, ephemeral: true});
        }

        await interaction.editReply(`Loading your ${track.playlist ? 'playlist' : 'track'}`);

        track.playlist ? queue.addTracks(track.tracks) : queue.addTrack(track.tracks[0]);

        if (!queue.playing) await queue.play();
    }
}