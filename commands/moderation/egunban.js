const { SlashCommandBuilder, ChatInputCommandInteraction, GuildBan } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egunban')
        .setDescription('unban the user with ID')
        .addStringOption((option) => option.setName('userid').setDescription('id of the user you want to unban'))
        .addStringOption((option) => option.setName('reason').setDescription('the reason')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        /*const user_id = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason');

        console.log(interaction.guild.bans);*/
    }
}