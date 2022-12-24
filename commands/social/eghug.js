const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { requestGif } = require('../../functions/request')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eghug')
        .setDescription('hug someone because you love him/her')
        .addUserOption((option) => option.setName('member').setDescription('The member you want to hug').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();
        const member = interaction.options.getMember('member');

        const data = await requestGif('anime hug');

        const embed = new EmbedBuilder()
            .setColor(0x000000 + Math.floor(Math.random() * 16777215))
            .setTitle('EGHUG')
            .setURL(data.url)
            .setDescription(`${interaction.member} hugs ${member}`)
            .setImage(data.gif);

        interaction.editReply({embeds: [embed]});
    }
}