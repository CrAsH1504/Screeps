var CREEP_ROLE = require('creep.role');
 
const STATE = {
        TO_SOURCE    : 0,
        HARVEST      : 1,  // ???
        TO_TARGET    : 2,
        SUICIDE      : 3,  // ???
        TO_WAIT      : 4,
        WAIT         : 5
    };

module.exports = {
    
    /** @param {Creep} creep **/
    run : function(creep){
        switch(creep.memory.state){
            case STATE.TO_SOURCE  : {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && creep.fatigue == 0) {
                    var a = creep.moveTo(sources[0], {reusePath: 13,  visualizePathStyle: {stroke: '#ffaa00'}});
                    if (a != 0) {console.log('error in harvest STATE.TO_SOURCE = ' + a )}
                }
                if(creep.carry.energy == creep.carryCapacity){
                    creep.memory.state = STATE.TO_TARGET;
                }
                break;
            }
            case STATE.TO_TARGET : {
                 var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                  });
                  if(targets.length > 0) {
                       if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            if (creep.fatigue == 0) { 
                                var a = creep.moveTo(targets[0], {reusePath: 22, visualizePathStyle: {stroke: '#ffffff'}});
                                if (a != 0) {console.log('error in harvest STATE.TO_STORAGE = ' + a )}
                            }
                       } else {
                           creep.memory.state = STATE.TO_SOURCE;
                       }
                  } else {
                      creep.memory.state = STATE.WAIT;
                  }
                break;
            }
            case STATE.TO_WAIT : {
                var flag = Game.flags['Flag1'];
                if (((creep.pos.x - flag.pos.x) ** 2 + (creep.pos.y - flag.pos.y) ** 2) > 2) {
                            if (creep.fatigue == 0) { 
                                var a = creep.moveTo(flag, {reusePath: 15, visualizePathStyle: {stroke: '#ffffff'}});
                                if (a != 0) {console.log('error in harvest STATE.TO_WAIT = ' + a )}
                            }
                } else {
                      creep.memory.state = STATE.WAIT;
                }
                break;
            }
            case STATE.WAIT : {
                if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                    creep.memory.state = STATE.TO_SOURCE;
                } else {
                    creep.memory.role = CREEP_ROLE.BUILDER;
                    creep.memory.state = STATE.TO_SOURCE;
                }
                break;
            }
        }
    }
    
};