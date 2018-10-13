// play	Plays a song with the given name or url.
// disconnect	Disconnect the bot from the voice channel it is in.
// np	Shows what song the bot is currently playing.
// aliases	List command aliases.
// ping	Checks the bot's response time to Discord.
// skip	Skips the currently playing song.
// seek	Seeks to a certain point in the current track.
// soundcloud	Searches soundcloud for a song
// remove	Removes a certain entry from the queue.
// loopqueue	Loops the whole queue.
// search	Searches YouTube for results of a URL.
// stats	Shows the stats of the bot.
// loop	Loop the currently playing song.
// donate	Info about donating to support Rythm!
// shard	Checks the shard you are on.
// join	Summons the bot to your voice channel.
// lyrics	Gets the lyrics of the current playing song
// info	Info about Rythm!
// resume	Resume paused music.
// settings	Change Rythm's settings.
// move	Moves a certain song to the first position in the queue or to a chosen position
// forward	Forwards by a certain amount in the current track.
// skipto	Skips to a certain position in the queue.
// clear	Clears the queue.
// replay	Reset the progress of the current song
// clean	Deletes the bot's messages and commands.
// pause	Pauses the currently playing track.
// removedupes	Removes duplicate songs from the queue.
// volume	Check or change the current volume.
// rewind	Rewinds by a certain amount in the current track.
// playtop	Like the play command, but queues from the top.
// playskip	Adds a song to the top of the queue then skips to it.
// invite	Links!
// shuffle	Shuffles the queue.
// queue	View the queue. To view different pages, type the command with the specified page number after it (queue 2).
// leavecleanup	Removes absent user's songs from the Queue.

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rythm_usage = new Discord.RichEmbed()
    .setDescription("Rythm Main Usage")
    .setColor("#15f153")
    .addField("join", "Summons the bot to your voice channel.")
    .addField("disconnect", "Disconnect the bot from the voice channel it is in.")
    .addField("play", "Plays a song with the given name or url.")
    .addField("find", "Find a song with the given name or url, and then choose one.")
    .addField("np", "Shows what song the bot is currently playing.")
    .addField("queue", "View the queue. To view different pages, type the command with the specified page number after it (queue 2).")
    .addField("skip", "Skips the currently playing song.")
    .addField("remove", "Removes a certain entry from the queue.")
    .addField("loopqueue", "Loops the whole queue.")
    .addField("loop", "Loop the currently playing song.")
    .addField("pause", "Pauses the currently playing track.")
    .addField("resume", "Resume paused music.")
    .addField("move", "Moves a certain song to the first position in the queue or to a chosen position.")
    .addField("skipto", "Skips to a certain position in the queue.")
    .addField("clear", "Clears the queue.")
    .addField("removedupes", "Removes duplicate songs from the queue.")
    .addField("leavecleanup", "Removes absent user's songs from the Queue.")

  message.channel.send(rythm_usage);
}

module.exports.help = {
  name: "rythm"
};
