const { SlashCommandBuilder, ChatInputCommandInteraction, GuildVoiceStates } = require('discord.js');
const { QueryType, Queue } = require ('discord-player');
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egplay')
        .setDescription('Play music')
        .addStringOption((option) => option.setName('query').setDescription('Music search query or link').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction, client) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) return interaction.editReply('You must first be in a channel !');
        const query = interaction.options.getString('query'); 

        const queue = new Queue(client.player, interaction.guild, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: interaction.channel,
            leaveOnEnd: true,
            initialVolume: 50
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

        console.log(queue)
        console.log(queue.tracks);
    }
}