var CREEP_ROLE = require('creep.role');

var creepSpawn = {
     
     
    /** @param {CREEP_ROLE} role 
        @param {Array} body 
        @param {number} cost 
        @param {StructureSpawn} spawn**/
    run : function(role,body,cost,spawn){
        if (spawn.energy >= cost && spawn.spawning == null ){
                var newName = CREEP_ROLE.NAME[role] + '_' + Game.time;
                spawn.spawnCreep(body, newName, 
                  {memory: {role: role,
                            mainRole: role,
                            state: 0,
                            prevState: 0
                  }
                  });
        }
    }
    
}

module.exports = creepSpawn