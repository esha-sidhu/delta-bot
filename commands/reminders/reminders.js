const { SlashCommandBuilder } = require('discord.js');

const sleep = m => new Promise(r => setTimeout(r, m));

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
                .setDescription('The frequency of time to remind the user of the task (in seconds)')
                .setRequired(true))

        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the remind should be ephemeral')),
    
    async execute(interaction) {
        const task = interaction.options.getString('input-task');
        let remPeriod = interaction.options.getString('input-reminder-period');
        const deadline = 100000;
        await interaction.reply(`${remPeriod} seconds reminder added for task ${task}`);
        remPeriod*=1000;
        var timer = 0;

        while(timer < deadline) {
            await sleep(1000);
            timer += 1000;
            
            if(timer % remPeriod == 0)
            {
                await interaction.followUp('reminder!');
            }
        }
    },
};