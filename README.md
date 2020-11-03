# LanxBot

This is a discord bot. Its intended to help players coordinating Phalanxes for GBF raids, specifically Luci Hard.

## Setup
download the latest version of nodejs [here](https://nodejs.org/en/) and install it  

open a CLI and type the following while in the projects directory:  
`npm i` to install all dependencies  
`npm i -g typescript` to install the tsc compiler globally  
`tsc` to compile the project  

## Setting up Bot Authentication
In order for the bot to use discord, you need a valid Token  
If you already have a discord bot, add its token in the BotConfig.json  
If you dont:   
* visit the [discord developer portal](https://discordapp.com/developers/applications)
* click on "new application" and give it any name
* select your application and go to the bot tab on the left nav bar
* click "add a Bot"
* click the "click to reveal token" button
* paste the token into the BotConfig.json file under "token" 
**important:** Your Token is your bots password, dont share it with anyone.

## Invite the bot to your server
* In the Developer Portal, choose the OAuth2 tab.
* In the checkbox list, click on bot
* in the now displayed permissions list, click "send messages"
* go to the generated url and select a server to add the bot too. If someone else needs to add it, set the bot to public in the bot tab.

## Starting the Bot
simply open a CLI in the projects src folder and type `node main.js`.  
The Bot will be running and listen to inputs.  

## Config
the BotConfig.json has a few options:  
**prefix**: change the prefix used for every command(e.g. !help becomes $help instead)  
**maxUsers**: the maximal amount of users to be registered at once  
**statusMessage**: simply the activity of the bot that will be displayed in the member list. Set to null to not display any.
**status**: options are only null, "WATCHING", "PLAYING", "STREAMING", "LISTENING". Anything else will crash the bot on startup. Sets the activity type for the status message. Set to null to not display any.
  
to change the names of the bot commands or their description with the help command, edit the src/commandList.ts file  
The commands name is represented by their key, change them as you like.  
Afterward you will have to run the `tsc` command again.  

## Basic Usage
every player using the bot first needs to use the "register" command  
afterwards, use the "lanx" command every time you use a phalanx. Use "turn" everytime you pass a turn  
For a full list of Commands, type "!help" or see below.  

## Current Commands
* !register: Register yourself so the bot starts recognizing you
* !unregister: Remove yourself from the bot so it stops recongnizing you
* !lanx: Use whenever you cast a Phalanx. Indicates all users as lanxed so they may progress a turn
* !turn: Use whenever you progress a turn
* !skip: Tell the bot that it should not wait for you to progress the current turn before requesting Phalanx
* !stuck: Tells the bot to stop waiting for you to progress a turn until you are unstuch or take a turn again
* !unstuck: Tells the bot to start waiting for you to progress turns again
* !status: Shows who still needs to progress a turn before lanxing again
* !cd: shows the current Phalanx CDs for all players
* !setcd: Use with a number to set your Phalanx CD to the indicated number
* !extend: increases current Phalanx CD by 2 turns(Orbital Blackness)
* !pool: use without an argument to display current summon pool.
* use with a summon name as argument to update the pool
* !pingme: toggle wether you get pinged whenever its your turn to lanx
* !reset: resets pool and lanx CDs
* !help: display this list
