/*
 * Discord "On This Day" Bot
 * Author: Emre CEBECI
 * Version: 1.0
 * Description: The bot that fetchs data from wikipedia's on this day pages.
 * ====================
 * IMPORTANT NOTICE!
 * If you want to use it in another language, you may need to change somethings
 * because wikipedia's on this day pages are different in different languages
 * Do not forget to edit config file.
 */
 
 // Importing node modules.
const Discord = require('discord.js')
const settings = require('./config.json');
const wikijs = require('wikijs').default;

// Creating bot object.
const bot = new Discord.Client();

// Sending some message to console when bot is ready!
bot.on("ready", () => {
	console.log("=================");
	console.log("On this day bot ready!");
	console.log("Author: Emre CEBECI");
	console.log("Version: 1.0")
	console.log("=================");
});

bot.on("message", (message) => {
	// You can change the command from "config.json" in "command"
	if(message.content == `${settings.command}`){
		// Who can use this command? You can change role id from "config.json" in "admin_role_id"
		const admin_role = message.member.roles.cache.get(settings.admin_role_id);
		// Checks if user is a admin
		if(!admin_role) return message.channel.send({embed: {color: "RED", description: settings.lang.no_perm}}).then(msg => { msg.delete({timeout: 6000})});
		// Sends wait message
		var wait_message = message.channel.send({embed: {color: "YELLOW", description: settings.lang.wait}}).then(msg => { msg.delete({timeout: 6000})});
		// Get and decleare dates
		var date = new Date();
		var month = Number(date.getMonth());
		var year = Number(date.getFullYear());
		var day = Number(date.getDate());
		var month_t = "";
		// Changing months numbers to strings because wikipedia wants that
		// If the wikipedia in your language wants another way, you may need to edit code.
		if(month == 0) month_t = settings.lang.month1;
		if(month == 1) month_t = settings.lang.month2;
		if(month == 2) month_t = settings.lang.month3;
		if(month == 3) month_t = settings.lang.month4;
		if(month == 4) month_t = settings.lang.month5;
		if(month == 5) month_t = settings.lang.month6;
		if(month == 6) month_t = settings.lang.month7;
		if(month == 7) month_t = settings.lang.month8;
		if(month == 8) month_t = settings.lang.month9;
		if(month == 9) month_t = settings.lang.month10;
		if(month == 10) month_t = settings.lang.month11;
		if(month == 11) month_t = settings.lang.month12;
		// The "wikidate" variable is very important.
		// This, decleares the date format that wikipedia accepts.
		// For Turkish:
		// wikidate = day + "_" + month_t;
		wikidate = month_t + "_" + day;
		
		// If you want the articles in specific channel then set "one_channel" to "true"
		var channel;
		if(settings.one_channel){
			// You can change channel id from "config.json"
			var channel = bot.channels.cache.get(settings.channel_id);
		} else {
			var channel = message.channel;
		}
		// The "page_tag" is the second most very important variable because
		// it decleares the wikipedia page that OTD contents are available.
		// For Turkish:
		// var page_tag = "Şablon:Tarihte_bugün/" + wikidate
		var page_tag = wikidate;
		console.log("Searching OTD article for this date: " + wikidate);
		console.log("and in this page: " + page_tag);
		// Embed colors, you may add HEX colors too.
		var embedcolors = ["BLUE","RED","GREEN","YELLOW","BLACK","GRAY","WHITE","#ff0123"]
		// Selects random embed colors
		var embedcolor = embedcolors[Math.floor(Math.random() * embedcolors.length)];
		// If you want on this day messages in English, you do not change wikipedia api url but
		// If you want from another language, you have to change api url to your language.
		// Ex: For Turkish you have to change it to "tr"
		wikijs({ apiUrl: settings.wikipedia_api_url }).page(page_tag).then(page => page.rawContent()).then(function (wikicontent){
			// For Turkish! in Turkish wikipedia, there are some bugs about line breaks.
			// wikicontent = wikicontent.replace("Doğumlar","```\n\n**Doğumlar**```").replace("Ölümler","```\n\n**Ölümler**```").replace("Olmonthlar","**Olmonthlar**```")+"```";
			// The English version of Wikipedia's on this day is very long, I do not recommend to replace things but you may try.
			// Checks if content is longer than 2000
			// We do this because Discord message length limit is 2000 and we have to split else send it.
			if(wikicontent.length >= 2000){
				// Decleare total parts
				var parts = Math.ceil(wikicontent.length / 2000);
				// Decleare part as 1
				var part = 1;
				// "i" is start index of string.
				for(var i = 0; i < wikicontent.length; i += 2000){
					// Sends the part of content
					channel.send({embed: {color: embedcolor, title: `${settings.lang.on_this_day} (${day} ${month_t} ${year})`, description: wikicontent.substr(i, 2000), footer: { text: `Part ${part} of ${parts} for ${day} ${month_t} ${year}`}}})
					// Increases the part value
					part += 1;
				}
			} else {
			channel.send({embed: {color: embedcolor, title: `${settings.lang.on_this_day} (${day} ${month_t} ${year})`, description: wikicontent}})
			}
		});
	}
})

// Start the bot.
// Do not forget to change your token from "configs.json"
bot.login(settings.token);