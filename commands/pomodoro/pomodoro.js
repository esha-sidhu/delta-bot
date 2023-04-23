const { SlashCommandBuilder } = require('discord.js');

const sleep = m => new Promise(r => setTimeout(r, m));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pomodoro')
		.setDescription('Starts 25-5 Pomodoro Timer!')
        .addStringOption(option =>
            option.setName('timer')
            .setDescription('25 min study timer (s) / 5 min break timer (b)')
            .setRequired(true)
        ),
	async execute(interaction) {
        const task = interaction.options.getString('timer');

        if (task == 's') {
            await interaction.reply('Pomodoro Started for 25 min Study Session :tomato:');
        
            var countDown = 1500000; // 25 min in ms
    
            for (let i = 0; i <= countDown; i = i + 1000) {
                await sleep(1000);
                var diff = countDown - i;
                var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((diff % (1000 * 60)) / 1000);
                await interaction.editReply(`Pomodoro 25 min Study Timer :tomato:: ${minutes}:${seconds} time remaining`);
            }
            
            await interaction.followUp('End of Pomodoro 25 min Study Session :tomato:');
        }
        else if (task == 'b') {
            await interaction.reply('Pomodoro Started for 5 min Break :tomato:');
        
            var countDown = 300000; // 5 min in ms
    
            for (let i = 0; i <= countDown; i = i + 1000) {
                await sleep(1000);
                var diff = countDown - i;
                var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((diff % (1000 * 60)) / 1000);
                await interaction.editReply(`Pomodoro 5 min Break :tomato:: ${minutes}:${seconds} time remaining`);
            }
            
            await interaction.followUp('End of Pomodoro 5 min Break :tomato:');
        }
        else {
            console.log(task);
            await interaction.reply('Invalid input. Please do \'s\' for a 25 min study timer or \'b\' for a 5 min break timer.');
        }
	},
};

