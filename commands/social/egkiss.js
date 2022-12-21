const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

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
        const response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=NZTa6H8KhqZnPWPOsQQOuvv6kZXf7ixq&tag=anime+kiss');
        const result = await response.json();

        const embed = new EmbedBuilder()
            .setColor(0x000000 + Math.floor(Math.random() * 16777215))
            .setTitle('EGKISS')
            .setURL(result.data.url)
            .setDescription(`${interaction.member} kiss ${member}`)
            .setImage('https://media.giphy.com/media/' + result.data.id + '/giphy.gif');

        interaction.editReply({embeds: [embed]});
    }
}