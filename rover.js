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

      let roverStatus = {
         completed: true,
         roverStatus: { 
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
         }
      };

      let roverMode = {
         completed: true
      }

      let moveRover = {
         completed: true
      }


      for (let i = 0; i < message.commands.length; i++) {
         let newCommand = message.commands[i].commandType

         let roverMode = {
            completed: true
         }
   
         let moveRover = {
            completed: true
         }
   
         if (newCommand == "MOVE") {
            if (roverStatus.roverStatus.mode == "LOW_POWER") {
               moveRover.completed = false
               resultsArray.push(moveRover)
            } else {
               moveRover.completed = true
               roverStatus.roverStatus.position = message.commands[i].value
               resultsArray.push(moveRover)
            }

         } else if (newCommand == "MODE_CHANGE") {
            if (message.commands[i].value === "NORMAL") {
               roverStatus.roverStatus.mode = "NORMAL"
               resultsArray.push(roverMode)
            } else if (message.commands[i].value === "LOW_POWER"){
               roverStatus.roverStatus.mode = "LOW_POWER"
               resultsArray.push(roverMode)
            }
         

         } else if (newCommand == "STATUS_CHECK"){
            resultsArray.push(roverStatus)

         }
      }
      return returnObject;
      };
      };


      let rover = new Rover(100);
      let commands = [
         new Command('STATUS_CHECK'),
         new Command('MOVE', 4321),
         new Command('STATUS_CHECK'),
         new Command('MODE_CHANGE', 'LOW_POWER'),
         new Command('MOVE', 3579)
      ];
      let message = new Message('TA power', commands);
      let response = rover.receiveMessage(message);
      
      console.log(response.results);

module.exports = Rover;