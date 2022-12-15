const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildBan, GuildBanManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egban')
        .setDescription('ban user')
        .addUserOption((option) => option.setName('member').setDescription('user to ban'))
        .addStringOption((option) => option.setName('reason').setDescription('reason')),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const member = interaction.options.getMember('member')
        const reason = interaction.options.getString('reason');

        if (!interaction.memberPermissions.has('BanMembers')) {
            interaction.reply('Don\'t have the permission to perform this command!');
            return;
        }

        member.ban({reason: reason});

    }
}