/*
const { SlashCommandBuilder } = require('discord.js');
const {collection, getDocs, query, where, updateDoc, getFirestore, doc} = require('firebase/firestore');
const {database, author} = require('../../firebase');

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
        const remPeriodHour = interaction.options.getString('input-reminder-period-hour');
        const remPeriodMinute = interaction.options.getString('input-reminder-period-minutes');
        await interaction.reply(`Reminder added for every ${remPeriodHour} hour ${remPeriodMinute} minutes for ${task}`);
        console.log(`Reminder added for every ${remPeriodHour} hour ${remPeriodMinute} minutes for ${task}`);

        const user = interaction.user.username;
        if (user === null)
        {
            return;
        }
        const taskQ = query(collection(database, "taskListData"), where("userID", "==", user));
        const taskQRes = await getDocs(taskQ);
        if (taskQRes.docs.length !== 0)
        {
            const list = doc(getFirestore(), "taskListData", taskQRes.docs[0].id);
            await updateDoc(list, {reminderHour: remPeriodHour, reminderMinute: remPeriodMinute});

            let pastTaskEntries = taskQRes.docs[0]._document.data.value.mapValue.fields.value.arrayValue;
            let pastChecked = taskQRes.docs[0]._document.data.value.mapValue.fields.checked.arrayValue;
            if (Object.keys(pastTaskEntries).length === 0 || Object.keys(pastChecked).length === 0)
            {
                return;
            }
            pastTaskEntries = pastTaskEntries.values;
            pastChecked = pastChecked.values;
        }

        // const amountTime = ((remPeriodHour * 60) * remPeriodMinute) * 60 * 1000;
        const amountTime = ((remPeriodHour * 60) * remPeriodMinute) * 60;

        const sleep = m => new Promise(r => setTimeout(r, m));
        // const sleep = m => new Promise(r => setInterval(r, m));
        async function delayedMessage() {
            await sleep(amountTime);
            await interaction.followUp(`How is your ${task} going?`);
            console.log(`How is your ${task} going?`);
        }
        delayedMessage();
        // setInterval(delayedMessage, amountTime);
        
        /*
        for (let i = 0; i <= amountTime; i += 1000) {
            await sleep(1000);
            await interaction.followUp(`How is ${task} going?`);
            console.log(`How is ${task} going?`);
        }
        
    },
};
*/

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
        const remPeriod = interaction.options.getString('input-reminder-period')*1000;
        const deadline = 100000;
        // await interaction.reply(`${remPeriod} hour reminder added for task ${task}`);
        console.log(`${remPeriod} seconds reminder added for task ${task}`);
        await interaction.reply(`reminder!`);
        var timer = 0; // 1 s

        while(timer < deadline) {
            await sleep(1000);
            timer += 1000;
            console.log(timer);
            
            if(timer % remPeriod == 0)
            {
                console.log("reminder");
                await interaction.followUp('reminder!');
            }
        }
    },
};