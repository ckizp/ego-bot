const { SlashCommandBuilder, ChatInputCommandInteraction} = require("discord.js");
const { JSON_Guilds } = require("../JSON_Object");
const obj = new JSON_Guilds("./guilds.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcomechannel')
        .setDescription("définit le salon courant comme salon d'accueil des nouveaux utilisateurs")
        .addChannelOption((option) => option.setName('channel').setDescription('the welcome channel')),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        obj.alter(interaction.guild.id, "welcomeChannelID", (channel) ? channel.id : interaction.channel.id);
        return interaction.reply("Ce salon est désormais le salon d'accueil du serveur !");
    }
}