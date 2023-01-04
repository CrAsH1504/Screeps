/*var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
*/

var start = require('start.creep');
var startData = require('start.data');
var utils = require('utils');

const spawnName = 'Spawn1';


module.exports.loop = function () {
     // console.log( " start " + Game.cpu.getUsed())
      var cpu =  Game.cpu.getUsed()

    if(Memory.startData != true){
        startData.run();
    }
  /*  for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }*/
/*   var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvest');
    
    if(harvesters.length < harvesterMax) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,CARRY,WORK], newName, 
            {memory: {role: 'harvest'}});        
    }*/
    utils.refreshAllRole();
    start.run();
    
/*
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
       //     roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
        //    roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
        //    roleBuilder.run(creep);
        }
    }*/
    //console.log( " end " + Game.cpu.getUsed())
    //    console.log(  Game.cpu.getUsed() - cpu)

}