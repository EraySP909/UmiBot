const fs = require("fs");
const botSettings = require('./botSettings.json' );
const Discord = require('discord.js');
const client = new Discord.Client();
const ownerID = botSettings.ownerID;
const botID = botSettings.botID;
const fortniteClient = require("fortnite");
const fortnite = new fortniteClient("1682c643-dcfe-4454-a497-c32ab2264a62");
const attachment = new Discord.Attachment;
const museMember = ['Maki','Rin','Hanayo','Honoka','Kotori','Nozomi','Eli','Nico','Myself???',];
const prefix = "u!";
const niconiconii = client.emojis.get("500213244749938688");
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(museMember[Math.floor(Math.random() * museMember.length)], {type: 'LISTENING'})
  	.catch(console.error);
});

client.on('message', message => {
  const args = message.content.slice(botSettings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;

  // Ping + respone with ms
    if (command === `ping`) {
    message.reply(`Pong! \`${(client.ping)}ms\``);
  }
  if (command === "help") {
      
  const embed = new Discord.RichEmbed()
  .addField("ping", "Pings Umibot", true)
  .addField("ap", "Activity Playing", true)
  .addField("al", "Activity Listening", true)
  .addField("aw", "Activity Watching", true)
  .addField("as", "Activity Streaming", true)
  .addField("say", "Say", true)
  .addField("poll", "Poll with Y/N", true)
  .addField("mistakes", "MISTAKES", true)
  .addField("eval", "Eval", true)
  .addField("die-yourself", "Kill myself lmao", true)
  .addField("Soon:tm:", ":)", true)
  message.channel.send(embed);
  }
  // Activity Playing	  
  if(command === `ap`) {
    if(message.author.id !== ownerID) return;
  const activityNamePlaying = args.join(" ");
  client.user.setActivity(activityNamePlaying, {type: 'PLAYING'})
 	.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
  message.channel.send(`Now playing ${activityNamePlaying}`);
  }
  // Activity Watching
  if(command === `aw`) {
    if(message.author.id !== ownerID) return;
    const activityNameWatching = args.join(" ");
    client.user.setActivity(activityNameWatching, {type: 'WATCHING'})
     .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
    message.channel.send(`Now watching ${activityNameWatching}`);
  }
  // Activity Listening  
  if(command === `al`) {
    if(message.author.id !== ownerID) return;
    const activityNameListening = args.join(" ");
    client.user.setActivity(activityNameListening, {type: 'LISTENING'})
 	  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
    message.channel.send(`Listening to ${activityNameListening}`);
  }
  // Activity Streaming, so far broken  
  if(command === `as`) {
    if(message.author.id !== ownerID) return;
    const activityNameStreaming = args.join(" ");
    client.user.setActivity(activityNameStreaming, {type: 'STREAMING'})
    .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
    message.channel.send(`Now streaming ${activityNameStreaming}`);
  }
  if(command === "nick") {
    if(message.author.id !== ownerID) return;
    const nick = args.join(" ");
    client.user.setNickname(nick)
  }
  if(command === "leave") {
    message.delete().catch(O_o=>{});
    message.guild.leave();
  }


  // Say "Message"  
  if(command === `say`) {
    if(message.author.id !== ownerID) return;
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  // Poll with a Y/N  
  if(command === `poll`) {
      const pollMessage = args.join(" "); 
      message.channel.send(`Poll: \n${pollMessage}`)
      .then(message => {message.react("🇾"), message.react("🇳")});
  }
  // !! EVAL !! USE WITH CAUTION  
   if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  if(command === "die-yourself") {
     if(message.author.id !== ownerID) return;
     message.channel.send('oh no ded')
     .then(() => {process.exit(1);
    })
  }
  if(command === "embedlmao") {
     const embed = new Discord.RichEmbed()
     .addField("Hi", "ok")
     .setColor("#3636F") //#34363C
     message.channel.send(embed)
  }
  if(command === "mistakes") {
      const embed = new Discord.RichEmbed()
      .addField("ufn", "Obvious Mistype", true)
      .addField("This bot", "haha yes", true)
      message.channel.send(embed);
  }
if (command === "listemojis") {
   const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
   message.channel.send(`_ _\n${emojiList}`);
  }
  if (command === "uptime") {
      let totalSeconds = Math.round(client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
      let uptime = `${hours}:${minutes}:${seconds}`;

      message.channel.send(uptime)
  }
});

client.login(botSettings.token);
