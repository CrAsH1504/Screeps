/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('start.data');
 * mod.thing == 'a thing'; // true
 */
 var startData = {
     
     run : function(){
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE);
        var source = []
        for (var i in sources){
            source.push(sources[i].pos)
        }
        console.log(source.toString())
        Memory.sources = source;
        Memory.startData = true;
         
         
         
     }
 }


module.exports = startData