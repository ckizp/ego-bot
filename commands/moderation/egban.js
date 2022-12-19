const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildBanManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egban')
        .setDescription('ban user')
        .addUserOption((option) => option.setName('member').setDescription('user to ban').setRequired(true))
        .addStringOption((option) => option.setName('time').setDescription('If you want to ban someone for a certain amount of time'))
        .addStringOption((option) => option.setName('reason').setDescription('reason of the ban')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        interaction.deferReply();

        const member = interaction.options.getMember('member');
        const time = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)
        || !interaction.guild.me) return interaction.reply('Don\'t have the permission to perform this command!');


        interaction.guild.bans.create(member.id, {reason: reason});
    }
}