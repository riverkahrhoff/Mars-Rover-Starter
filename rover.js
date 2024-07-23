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
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position,
      };

      for (let i = 0; i < message.commands.length; i++) {
         let newCommand = message.commands[i].commandType
         if (newCommand == "STATUS_CHECK"){
            resultsArray.push(roverStatus)
         } else if (newCommand == "MODE_CHANGE") {
            resultsArray.push("mode change")
         } else {
            resultsArray.push("move")
         }
      }
      return returnObject;
      };
      };


      let commands = [new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);    // Passes 98382 as the rover's position.
      let response = rover.receiveMessage(message);
      
      console.log(response);

module.exports = Rover;