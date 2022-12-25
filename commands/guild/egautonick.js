const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const guild_model = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egautonick')
        .setDescription('Set the default nickname!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption((option) => option.setName('nickname').setDescription('the nickname you want to give to new members !').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        const nick = interaction.options.getRole('nickname');

        const data = guild_model.findOne({id: interaction.guildId});

        interaction.editReply('Server autonick updated !')
    }
}