const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const {collection, getDocs, query, where} = require('firebase/firestore');
const {database} = require('../../firebase');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Displays your todo list'),
	async execute(interaction) {
        const userID = interaction.user.id;
        const listQ = query(collection(database, "taskListData"), where("userID", "==", userID));
        const listQRes = await getDocs(listQ);
        if (listQRes.docs.length !== 0)
        {
            let allTasks = listQRes.docs[0]._document.data.value.mapValue.fields.task.arrayValue.values;
            let allDeadlines = listQRes.docs[0]._document.data.value.mapValue.fields.deadline.arrayValue.values;
            let allTasksStr = "";
            let len = allTasks.length;
            if (len == 0)
            {
                allTasksStr = "No tasks to complete!"
            }
            else
            {
                for (let i = 0; i < len; i++)
                {
                    allTasksStr = allTasksStr.concat("- **", allTasks[i].stringValue, "**\n", "\u1CBC\u1CBC*", allDeadlines[i].stringValue, "*\n");
                }
            }
            const listEmbed = new EmbedBuilder()
                .setTitle("Your todo list")
                .setDescription(`${allTasksStr}`)
            await interaction.reply({embeds: [listEmbed]});
        }
	},
};