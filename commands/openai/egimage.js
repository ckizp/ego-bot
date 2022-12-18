const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js')
const { generateImage }= require('../../functions/generate');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egimage')
        .setDescription('create realistic images and art from a description in natural language')
        .addStringOption((option) => option.setName('prompt').setDescription('text detailed description of the image').setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
    async execute(interaction) {
        let prompt = interaction.options.getString('prompt');

        interaction.deferReply();

        const url = await generateImage(prompt);

        interaction.editReply(url);
    }
}