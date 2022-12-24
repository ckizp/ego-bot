const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { requestGif } = require('../../functions/request')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egkiss')
        .setDescription('kiss someone because you love him/her')
        .addUserOption((option) => option.setName('member').setDescription('The member you want to kiss').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        const member = interaction.options.getMember('member');

        const data = await requestGif('anime kiss');

        const embed = new EmbedBuilder()
            .setColor(0x000000 + Math.floor(Math.random() * 16777215))
            .setTitle('EGKISS')
            .setURL(data.url)
            .setDescription(`${interaction.member} kiss ${member}`)
            .setImage(data.gif);

        interaction.editReply({embeds: [embed]});
    }
}

// ******************************************
// Using Giphy API
// API_KEY : NZTa6H8KhqZnPWPOsQQOuvv6kZXf7ixq
// Accessible https://developers.giphy.com/dashboard/?
// ******************************************