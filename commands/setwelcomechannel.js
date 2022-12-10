const { SlashCommandBuilder } = require("discord.js");
const { JSON_Guilds } = require("../JSON_Object");
const obj = new JSON_Guilds("./guilds.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcomechannel")
        .setDescription("définit le salon courant comme salon d'accueil des nouveaux utilisateurs"),
    async execute(interaction) {
        obj.alter(interaction.guild.id, "welcomeChannelID", interaction.channel.id);
        await interaction.reply("Ce salon est désormais le salon d'accueil du serveur !");
    }
}