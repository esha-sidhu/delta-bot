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
        const taskName = interaction.options.getString('task');
        const deadline = new Date(interaction.options.getInteger('year'), interaction.options.getInteger('month') - 1, interaction.options.getInteger('day'), interaction.options.getInteger('hour'), interaction.options.getInteger('minute'));
        const deadlineStr = deadline.toString();
        const listQ = query(collection(database, "taskListData"), where("userID", "==", userID));
        const listQRes = await getDocs(listQ);
        if (listQRes.docs.length !== 0)
        {
            console.log("user found");
            const ID = listQRes.docs[0].id;
            const docToUpdate = doc(database, "taskListData", ID);
            let tempTask = listQRes.docs[0]._document.data.value.mapValue.fields.task.arrayValue.values;
            let tempDeadline = listQRes.docs[0]._document.data.value.mapValue.fields.deadline.arrayValue.values;
            let tempHour = listQRes.docs[0]._document.data.value.mapValue.fields.reminderHour.arrayValue.values;
            let tempMin = listQRes.docs[0]._document.data.value.mapValue.fields.reminderMinute.arrayValue.values;

            let taskList = [];
            let lenT = tempTask.length;
            for (let i = 0; i < lenT; i++)
            {
                taskList.push(tempTask[i].stringValue);
            }

            let deadlineList = [];
            for (let i = 0; i < lenT; i++)
            {
                deadlineList.push(tempDeadline[i].stringValue);
            }

            let hourList = [];
            for (let i = 0; i < lenT; i++)
            {
                hourList.push(tempHour[i].stringValue);
            }

            let minList = [];
            for (let i = 0; i < lenT; i++)
            {
                minList.push(tempMin[i].stringValue);
            }

            taskList.push(taskName);
            deadlineList.push(deadlineStr);
            hourList.push("-1");
            minList.push("-1");

            // console.log(docToUpdate);
            await updateDoc(docToUpdate, {task: taskList, deadline: deadlineList, reminderHour: hourList, reminderMinute: minList});
        }
        else
        {
            let taskList = [];
            let deadlineList = [];
            let hourList = [];
            let minList = [];
            taskList.push(taskName);
            deadlineList.push(deadlineStr);
            hourList.push("-1");
            minList.push("-1");
            await addDoc (collection(database, "taskListData"), {
                userID: userID,
                task: taskList,
                deadline: deadlineList,
                reminderHour: hourList,
                reminderMinute: minList
            }
            );
        }

        await interaction.reply(`${user} added "${taskName}" to their todo list\nDeadline: ${deadline}`);
        console.log(`${userID} added "${taskName}" to their todo list`);
	},
};