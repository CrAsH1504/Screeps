var creepSpawn = {
     
     
    /** @param {String} role 
        @param {Array} body 
        @param {number} cost 
        @param {StructureSpawn} spawn**/
    run : function(role,body,cost,spawn){
        if (spawn.energy >= cost && spawn.spawning == null ){
                var newName = role + Game.time;
                spawn.spawnCreep(body, newName, 
                  {memory: {role: role, state: 0}});
        }
    }
    
}

module.exports = creepSpawn