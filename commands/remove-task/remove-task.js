const { SlashCommandBuilder } = require('discord.js');
const {addDoc, collection, getDocs, query, where, updateDoc, doc} = require('firebase/firestore');
const {database} = require('../../firebase');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('remove')
	    .setDescription('Removes/deletes a task from the task list')

        .addIntegerOption(option =>
            option.setName('tasknumber')
            .setDescription('Number of Task to Remove (starting with 1)')
            .setRequired(true)
        ),
    
    async execute(interaction) {
        const user = interaction.user.username;
        const userID = interaction.user.id;
        const task_index = interaction.options.getInteger('tasknumber') - 1;
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

            let task = "";
            for (let i = 0; i < lenT; i++)
            {
                if (i != task_index) {
                    taskList.push(tempTask[i].stringValue);
                }
                else{
                    task = tempTask[i].stringValue;
                }
            }

            let deadlineList = [];
            for (let i = 0; i < lenT; i++)
            {
                if (i != task_index) {
                    deadlineList.push(tempDeadline[i].stringValue);
                }
            }

            let hourList = [];
            for (let i = 0; i < lenT; i++)
            {
                if (i != task_index) {
                    hourList.push(tempHour[i].stringValue);
                }
            }

            let minList = [];
            for (let i = 0; i < lenT; i++)
            {
                if (i != task_index) {
                    minList.push(tempMin[i].stringValue);
                }
            }

            // console.log(docToUpdate);
            await updateDoc(docToUpdate, {task: taskList, deadline: deadlineList, reminderHour: hourList, reminderMinute: minList});
            await interaction.reply(`Task removed: ${task}`);
        }
    },
};