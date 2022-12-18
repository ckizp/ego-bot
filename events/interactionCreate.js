const { Events, Client } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate
	/**
	 * @param {Client} client 
	 */,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			let client = interaction.client;
			await command.execute(interaction, client);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	}
};