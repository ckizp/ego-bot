const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egquote')
        .setDescription('Get a random quote !'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        await interaction.deferReply();

        const response = await fetch('https://api.kanye.rest');
        const data = await response.json();

        interaction.editReply(data.quote);
    }
}