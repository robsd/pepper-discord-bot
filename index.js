require('dotenv').config(); 

const Discord = require('discord.js');
const client = new Discord.Client();

const date = new Date();
const prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('hsg.ukwsite.com', { type: 'WATCHING' });
});

client.on('message', msg => {

  const guild = msg.guild;
  const member = msg.member;

  const membersRole = guild.roles.cache.find(role => role.name === 'Members');
  const helpersRole = guild.roles.cache.find(role => role.name === 'Helpers');

  const firstYearsRole = guild.roles.cache.find(role => role.name === 'First Years');
  const secondYearsRole = guild.roles.cache.find(role => role.name === 'Second Years');
  const finalYearsRole = guild.roles.cache.find(role => role.name === 'Final Years');

  const csRole = guild.roles.cache.find(role => role.name === 'CS Stream');
  const nwRole = guild.roles.cache.find(role => role.name === 'Networks Stream');
  const aiRole = guild.roles.cache.find(role => role.name === 'AI Stream');
  const seRole = guild.roles.cache.find(role => role.name === 'Software Engineering Stream');

  if (msg.author.bot) return;
  if (msg.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'test') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    }
    msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }

  if (command === 'clear') {
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.channel.messages.fetch().then(messages => {
        msg.channel.bulkDelete(messages)
      });
    }
    else {
      msg.reply('You dont have permission to run that command!');
    }
  }

  if (command === 'ban') {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          member.ban(args);
        }
        else {
          msg.reply('That member doesnt exist!');
        }
      }
      else {
        msg.reply('You didnt mention a user to ban!');
      }
    }
    else {
      msg.reply('You dont have permission to run that command!');
    }
  }

  if (command === 'accept') {
    member.roles.add(membersRole).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'make-helper') {
    member.roles.add(helpersRole).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'remove-helper') {
    member.roles.remove(helpersRole).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'y1') {
    member.roles.add(firstYearsRole).catch(console.error);
    member.roles.remove([secondYearsRole, finalYearsRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'y2') {
    member.roles.add(secondYearsRole).catch(console.error);
    member.roles.remove([firstYearsRole, finalYearsRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'y3') {
    member.roles.add(finalYearsRole).catch(console.error);
    member.roles.remove([firstYearsRole, secondYearsRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'cs') {
    member.roles.add(csRole).catch(console.error);
    member.roles.remove([nwRole, aiRole, seRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'nw') {
    member.roles.add(nwRole).catch(console.error);
    member.roles.remove([csRole, aiRole, seRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'ai') {
    member.roles.add(aiRole).catch(console.error)
    member.roles.remove([csRole, nwRole, seRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

  if (command === 'se') {
    member.roles.add(seRole).catch(console.error);
    member.roles.remove([csRole, nwRole, aiRole]).catch(console.error);
    msg.channel.messages.fetch({limit: 1}).then(messages => {
      msg.channel.bulkDelete(messages)
    });
  }

});

require('./server')();
client.login();