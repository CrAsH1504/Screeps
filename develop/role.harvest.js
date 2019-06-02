   const STATE = {
        TO_SOURCE    : 0,
        HARVEST      : 1,
        TO_STORAGE   : 2,
        SUICIDE      : 3
    }

module.exports = {
    
     /** @param {Creep} creep **/
    run : function(creep){
         switch(creep.memory.state){
            STATE.TO_SOURCE  : {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {reusePath: 15, visualizePathStyle: {stroke: '#ffaa00'}});
                }
                if(creep.carry.energy == creep.carryCapacity){
                    creep.memory.state = STATE.TO_STORAGE;
                }
                break;
    }
            STATE.TO_STORAGE : {
                 var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                  });
                  if(targets.length > 0) {
                       if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 50, noPathFinding: false, visualizePathStyle: {stroke: '#ffffff'}});
                       } else {
                           creep.memory.state = STATE.TO_SOURCE;
                       }
            }                
            }
         }
    }
    
};