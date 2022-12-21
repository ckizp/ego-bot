const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('egavatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('member').setDescription('The user\'s avatar to show')),
		/**
		 * @param {ChatInputCommandInteraction} interaction  
		 */
	async execute(interaction) {
		let member = interaction.options.getUser('member');

		const embed = new EmbedBuilder()
			.setColor(0x000000 + Math.floor(Math.random() * 16777215))
			.setTitle('EGAVATAR')
			.setURL(`${member.avatarURL({extension: 'png'})}`)
			.setDescription(`${member}'s avatar`)
			.setImage(member.displayAvatarURL({dynamic: true, size: 512}));


		await interaction.channel.send({embeds: [embed]})

		interaction.reply('OK');

		/*if (member) return interaction.reply(`${member.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);

		return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);*/
	},
};