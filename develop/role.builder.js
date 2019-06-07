   const STATE = {
        TO_STORAGE   : 0,
        TO_SOURCE    : 1,
        TO_CONSTRUCT : 2,
        BUILD        : 3,
        TO_WAIT      : 4, // ???
        WAIT         : 5  // ???
    };


module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        switch(creep.memory.state){
            case STATE.TO_STORAGE : {
                creep.memory.state = STATE.TO_SOURCE;
            }
            case STATE.TO_SOURCE  : {
                const sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && creep.fatigue == 0) {
                    const a = creep.moveTo(sources[0], {reusePath: 13,  visualizePathStyle: {stroke: '#ffaa00'}});
                    if (a != 0) {console.log('error in build STATE.TO_SOURCE = ' + a )}
                }
                if(creep.carry.energy == creep.carryCapacity){
                    creep.memory.state = STATE.TO_CONSTRUCT;
                }
                break;
            }
            case STATE.TO_CONSTRUCT : {
                const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        const a = creep.moveTo(target, {reusePath: 13,  visualizePathStyle: {stroke: '#ffaa00'}});
                    if (a != 0) {console.log('error in build STATE.TO_CONSTRUCT = ' + a )}
                    }       
                    if (creep.carry.energy == 5){
                       creep.memory.state = STATE.TO_STORAGE;
                    } 
                    
                }else{
                    creep.memory.state = STATE.WAIT;
                }
                break;
            }
            case STATE.WAIT : {
                const a = creep.upgradeController(creep.room.controller);
                if( a != 0) {console.log('error in upgrad STATE.UPGRADE = ' + a )}
                if (creep.carry.energy == 0){
                    creep.memory.state = STATE.TO_SOURCE;
                }
            
                break;
            }
        }
	    
	}
};