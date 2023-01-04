/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('start.creep');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvest');
var roleUpgrader = require('role.upgrad');
var roleBuilder = require('role.builder');
var creepSpawn = require('start.creep.spawn');
var creepRole= require('creep.role');


const harvesterRole = 'harvest';
const harvesterMax = 2;
const harvesterBody = [MOVE,CARRY,WORK];
const harvesterCost = 200;



const upgraderRole = 'upgrad';
const upgraderMax = 2;
const upgraderBody = [MOVE,MOVE,CARRY,CARRY,WORK];
const upgraderCost = 300;

const builderRole = 'builder';
const builderMax = 0;
const builderBody = [MOVE,MOVE,MOVE,CARRY,WORK];
const builderCost = 300;


var creepLive = {
    run : function(){
        var countHarv = 0;
        var countUpgrad = 0;
        var countBuilder = 0;
        for(var name in Memory.creeps){
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            } else {
                var creep = Game.creeps[name];
                
                switch(creep.memory.role){
                    case harvesterRole : {  
                        roleHarvester.run(creep);
                        countHarv++;
                        break;
                    }
                    
                    case upgraderRole : {  
                        roleUpgrader.run(creep);
                        countUpgrad++;
                        break;
                    }
                    
                    case builderRole : {  
                        roleBuilder.run(creep);
                        countBuilder++;
                        break;
                    }
                }
            }
        }
        
        creepRole.CREEP_ROLE.HARVESTER
        if (countBuilder < builderMax){
            creepSpawn.run(builderRole,builderBody,builderCost,Game.spawns['Spawn1']);
        }
        if (countUpgrad < upgraderMax){
            creepSpawn.run(upgraderRole,upgraderBody,upgraderCost,Game.spawns['Spawn1']);
        }
        if (countHarv < harvesterMax){
            creepSpawn.run(creepRole.CREEP_ROLE.HARVESTER,harvesterBody,harvesterCost,Game.spawns['Spawn1']);
        }
        
        
    }
}

module.exports =  creepLive;