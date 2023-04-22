const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('remind')
	    .setDescription('Sets a consistent reminder every x amount of time for your task')

	    .addStringOption(option =>
		    option.setName('input-task')
			    .setDescription('The task to set reminders for')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('input-reminder-period')
                .setDescription('The frequency of time to remind the user of the task (in hours)')
                .setRequired(true))

        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the remind should be ephemeral')),
    
    async execute(interaction) {
        const task = interaction.options.getString('input-task');
        const remPeriod = interaction.options.getString('input-reminder-period');
        await interaction.reply(`${remPeriod} hour reminder added for task ${task}`);
        console.log(`${remPeriod} hour reminder added for task ${task}`);
    },
};