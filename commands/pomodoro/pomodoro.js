const { SlashCommandBuilder } = require('discord.js');

const sleep = m => new Promise(r => setTimeout(r, m));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pomodoro')
		.setDescription('Starts 25-5 Pomodoro Timer!'),
	async execute(interaction) {
        await interaction.reply('Pomodoro Started for 25 min Session :tomato:');
        
        var countDown = 1500000; // 25 min in ms

        for (let i = 0; i <= countDown; i = i + 1000) {
            await sleep(1000);
            var diff = countDown - i;
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            await interaction.editReply(`Pomodoro 25 min timer :tomato:: ${minutes}:${seconds} time remaining`);
        }
        
        await interaction.followUp('End of Pomodoro 25 min Session');
	},
};

