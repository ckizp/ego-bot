const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const { JSON_Guilds } = require("../../JSON_Object");
const obj = new JSON_Guilds("./guilds.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('egwelcomechannel')
        .setDescription("définit le salon courant comme salon d'accueil des nouveaux utilisateurs")
        .addChannelOption((option) => option.setName('channel').setDescription('the welcome channel')),
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply('Don\'t have the permission to perform this command !');

        const channel = interaction.options.getChannel('channel');
        obj.alter(interaction.guild.id, "welcomeChannelID", (channel) ? channel.id : interaction.channel.id);
        return interaction.reply("Ce salon est désormais le salon d'accueil du serveur !");
    }
}