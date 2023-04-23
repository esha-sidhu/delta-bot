const { SlashCommandBuilder } = require('discord.js');
const {addDoc, collection, getDocs, query, where, updateDoc, doc} = require('firebase/firestore');
const {database} = require('../../firebase');

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
            option.setName('input-reminder-period-hour')
                .setDescription('The frequency of time to remind the user of the task (in hours)')
                .setRequired(true)) 
        
        .addStringOption(option =>
            option.setName('input-reminder-period-minutes')
                .setDescription('The frequency of time to remind the user of the task (in minutes)')
                .setRequired(true)) 
        
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the remind should be ephemeral')),
    
    async execute(interaction) {
        const task = interaction.options.getString('input-task');
        const remPeriodH = interaction.options.getString('input-reminder-period-hours');
        const remPeriodM = interaction.options.getString('input-reminder-period-minutes');
        const deadline = 100000;
        if(remPeriodH != null)
        {
            if(remPeriodM != null)
            {
                await interaction.reply(`${remPeriodH} hours ${remPeriodM} minutes reminder added for task ${task}!`);
            }
            else
            {
                await interaction.reply(`${remPeriodH} hours reminder added for task ${task}!`);
            }
        }
        else if(remPeriodM != null)
        {
            await interaction.reply(`${remPeriodM} minutes reminder added for task ${task}!`);
        }
        
        const remPeriodT = 1000*60*60*remPeriodH + 1000*60*remPeriodM;
        var timer = 0;

        while(timer < deadline) {
            await sleep(1000);
            timer += 1000;
            
            if(timer % remPeriodT == 0)
            {
                await interaction.followUp(`Reminder for ${task}!`);
            }
        }
    },
};