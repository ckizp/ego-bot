const { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, Guild } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egkick')
        .setDescription('kick a user from the server')
        .addUserOption((option) => option.setName('member').setDescription('Member to kick'))
        .addStringOption((option) => option.setName('reason').setDescription('State the reason')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        /*const member = interaction.options.get('member');
        const reason = interaction.options.get('reason');
            
        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            interaction.reply('Vous n\'avez pas la permission d\'exécuter cette command !');
            return;
        }

        member.kick(reason);*/
    }
}