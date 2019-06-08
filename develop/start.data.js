

var CONST = require('const');

const room1 = 'W5N8'

//ID source in room end creep count
var s1 = {
    'id' :'68050773313e4cb',
    'maxLimit': 4
}

var s2 = {
    'id' : '9fa9077331385d3',
    'macLimit': 3
}

 

const sourceUpgrader = 1;
const sourceBuild = 0;

module.exports = {
     
     run : function(){
        Memory.sources =  [s1,s2];
        //Memory.sources[s2Id] = s2Count; CONST.creepRole.UPGRADER
     //   Game.spawns['Spawn1'].memory.role = { CONST.creepRole.UPGRADER : {'source' : sourceUpgrader}}
        //Game.spawns['Spawn1'].memory.propertyIsEnumerable = sourceUpgrade;
        //Game.spawns['Spawn1'].memory.sourceBuild = sourceBuild;
        console.log("Inicilization data")
        Memory.startData = true;
        
        
     }
 }