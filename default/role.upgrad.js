   const STATE = {
        TO_SOURCE    : 0,
        HARVEST      : 1, // ???
        TO_CONTROLER : 2,
        UPGRADE      : 3,
        TO_WAIT      : 4, // ???
        WAIT         : 5  // ???
    };

module.exports = {
    
    /** @param {Creep} creep **/
    run : function(creep){
        switch(creep.memory.state){
            case STATE.TO_SOURCE  : {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && creep.fatigue == 0) {
                    var a = creep.moveTo(sources[0], {reusePath: 13,  visualizePathStyle: {stroke: '#ffaa00'}});
                    if (a != 0) {console.log('error in upgrad STATE.TO_SOURCE = ' + a )}
                }
                if(creep.carry.energy == creep.carryCapacity){
                    creep.memory.state = STATE.TO_CONTROLER;
                }
                break;
            }
            case STATE.TO_CONTROLER : {
                var controler = creep.room.controller;
                if (((creep.pos.x - controler.pos.x) ** 2 + (creep.pos.y - controler.pos.y) ** 2) > 16){  
                    if (creep.fatigue == 0) { 
                        var a = creep.moveTo(controler, {reusePath: 22, visualizePathStyle: {stroke: '#ffffff'}});
                        if (a != 0) {console.log('error in upgrad STATE.CONTROLER = ' + a )}
                    }
                } else {
                    creep.memory.state = STATE.UPGRADE;
                }
           
                break;
            }
            case STATE.UPGRADE : {
               
                var a = creep.upgradeController(creep.room.controller);
                if( a != 0) {console.log(creep.name + ': error in upgrad STATE.UPGRADE = ' + a )}
                if (creep.carry.energy < 2){
                    creep.memory.state = STATE.TO_SOURCE;
                }
            
                break;
            }
        }
    }
    
};