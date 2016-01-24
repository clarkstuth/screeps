var spawnUtil = require('SpawnUtil');
var creepUtil = require('CreepUtil');

module.exports.loop = function () {

    for (var spawn in Game.spawns) {
        spawn = Game.spawns[spawn];

        spawn.determineState();
        spawn.assignUnassignedCreeps();
        spawn.act();
    }

}