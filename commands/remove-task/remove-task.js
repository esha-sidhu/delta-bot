const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('remove')
	    .setDescription('Removes/deletes a task from the task list')

	    .addStringOption(option =>
		    option.setName('input-task')
			    .setDescription('The task to remove')
                .setRequired(true))

        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the remove should be ephemeral')),
    
    async execute(interaction) {
        const task = interaction.options.getString('input-task');
        await interaction.reply(`Task removed: ${task}`);
        console.log(`Task removed: ${task}`);
    },
};