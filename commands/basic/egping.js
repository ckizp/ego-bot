const { SlashCommandBuilder, ChatInputCommandInteraction} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egping')
        .setDescription("get ego's ping"),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        const msg = await interaction.reply("Latence d'Ego : ");
        await interaction.editReply(`Latence d'Ego : ${msg.createdTimestamp - interaction.createdTimestamp}`);
    }
}