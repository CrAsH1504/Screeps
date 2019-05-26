/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('start.creep');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvester');

var creepLive = {
    run : function(){
        var countHarv = 0;
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            
            switch(creep.memory.role){
                case 'harvest' : {  
                    roleHarvester.run(creep);
                    countHarv++;
                    break;
                }
            }
        }
        console.log(countHarv)
    }
}

module.exports =  creepLive;