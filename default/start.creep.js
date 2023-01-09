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
var CREEP_ROLE = require('creep.role');


const harvesterRole = 'harvest';
const harvesterMax = 2;
const harvesterBody = [MOVE,CARRY,WORK];
const harvesterCost = 200;



const upgraderRole = 'upgrad';
const upgraderMax = 1;
const upgraderBody = [MOVE,MOVE,CARRY,CARRY,WORK];
const upgraderCost = 300;

const builderRole = 'builder';
const builderMax = 3;
const builderBody = [MOVE,CARRY,WORK,WORK];
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
                    case CREEP_ROLE.HARVESTER : {  
                        roleHarvester.run(creep);
                        break;
                    }
                    
                    case CREEP_ROLE.UPGRADER : {  
                        roleUpgrader.run(creep);
                        break;
                    }
                    
                    case CREEP_ROLE.BUILDER : {  
                        roleBuilder.run(creep);
                        break;
                    }
                }
                switch(creep.memory.mainRole){
                    case CREEP_ROLE.HARVESTER : {
                        countHarv++;
                        break;
                    }
                    
                    case CREEP_ROLE.UPGRADER : {
                        countUpgrad++;
                        break;
                    }
                    
                    case CREEP_ROLE.BUILDER : {  
                        countBuilder++;
                        break;
                    }
                }
            }
        }
       // console.log(CREEP_ROLE.NAME[0])
        if (countHarv < harvesterMax){
            creepSpawn.run(CREEP_ROLE.HARVESTER,harvesterBody,harvesterCost,Game.spawns['Spawn1']);
        }else if (countUpgrad < upgraderMax){
            creepSpawn.run(CREEP_ROLE.UPGRADER,upgraderBody,upgraderCost,Game.spawns['Spawn1']);
        }else if (countBuilder < builderMax){
            creepSpawn.run(CREEP_ROLE.BUILDER,builderBody,builderCost,Game.spawns['Spawn1']);
        }
        
        
        
    }
}

module.exports =  creepLive;

