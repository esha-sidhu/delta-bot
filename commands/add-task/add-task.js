const { SlashCommandBuilder } = require('discord.js');
const {addDoc, collection, getDocs, query, where, updateDoc, getFirestore, doc} = require('firebase/firestore');
const {database, author} = require('../../firebase');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Adds task to your todo list')
        .addStringOption(option =>
            option.setName('task')
            .setDescription('Task that you want to add')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('month')
            .setDescription('Month of the task deadline')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('day')
            .setDescription('Day of the task deadline')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('year')
            .setDescription('Year of the task deadline')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('hour')
            .setDescription('Hour of the task deadline')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minute')
            .setDescription('Minute of the task deadline')
            .setRequired(true)
        ),
	async execute(interaction) {
        const user = interaction.user.username;
        const userID = interaction.user.id;
        const task = interaction.options.getString('task');
        const deadline = new Date(interaction.options.getInteger('year'), interaction.options.getInteger('month') - 1, interaction.options.getInteger('day'), interaction.options.getInteger('hour'), interaction.options.getInteger('minute'));
        if (deadline === deadline)
        {
            let list = [];
            list.push(task);
            await addDoc (collection(database, "taskListData"), {
                userID: userID,
                value: list,
                deadline: deadline,
                reminder: -1
            }
            );

            await interaction.reply(`${user} added "${task}" to their todo list\nDeadline: ${deadline}`);
            console.log(`${userID} added "${task}" to their todo list`);
        }
        else
        {
            await interaction.reply("Invalid date");
        }
	},
};