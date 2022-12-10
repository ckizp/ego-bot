const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { JSON_Guilds } = require("../JSON_Object");
const obj = new JSON_Guilds("./guilds.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatarego')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction  
	 */
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
	},
};