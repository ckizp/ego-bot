const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js')
const { generateImage }= require('../../functions/generate');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egimage')
        .setDescription('create realistic images and art from a description in natural language')
        .addStringOption((option) => option.setName('description').setDescription('text detailed description of the image')),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
        async execute(interaction) {
            let desc = interaction.options.getString('description');

            desc = ((desc) ? (desc) : ('Ego Jinpachi'));

            interaction.reply("loading image...");

            const url = await generateImage(desc);

            interaction.editReply(url);
        }
}