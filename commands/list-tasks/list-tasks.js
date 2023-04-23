const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Displays your todo list'),
	async execute(interaction) {
		await interaction.channel.reply();
	},
};