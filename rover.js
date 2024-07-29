const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
    };

    receiveMessage(message) {

      let resultsArray = [];

      let returnObject = {
         message: message.name,
         results: resultsArray
      };



      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         let newCommand = command.commandType
   
         if (newCommand == "MOVE") {
            if (this.mode === "LOW_POWER") {
               resultsArray.push({completed: false})
            } else {
               this.position = command.value
               resultsArray.push({completed: true})
            }

         } 

         else if (newCommand === "STATUS_CHECK"){
            let roverStatus = {
               completed: true,
               roverStatus: { 
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               }
            };
            resultsArray.push(roverStatus)

         }else if (newCommand == "MODE_CHANGE") {
               this.mode = command.value;
               resultsArray.push({completed: true})
            }
         

         } 
         return returnObject;
      }
      };



module.exports = Rover;