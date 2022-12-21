const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egskip')
        .setDescription('Skip playing music'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.editReply('You don\'t have the permission to perform this command !');

        const queue = client.player.getQueue(interaction.guild);

        try {
            queue.skip();
        } catch {
            return interaction.editReply('I\'m not playing music !');
        }

        interaction.editReply('Skipped music');
    }
}