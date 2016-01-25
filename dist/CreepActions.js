var log = require('Logger').createLogger('CreepAction');

module.exports.harvestAction = function (creep) {
    log.debug(creep.name + ' Harvesting');

    var spawn = Game.getObjectById(creep.memory.spawnId);
    var source = Game.getObjectById(creep.memory.sourceId);

    if (creep.carry.energy == creep.carryCapacity) {
        transferToSpawn(creep, spawn);
    } else if (creep.harvest(source) != OK) {
        harvestSource(creep, source);
    }
};

function transferToSpawn(creep, spawn) {
    if (creep.transfer(spawn, RESOURCE_ENERGY) != OK) {
        log.debug(creep.name + ' moving to ' + spawn);
        creep.moveTo(spawn);
    } else {
        log.debug(creep.name + ' transferred energy to ' + spawn);
    }
}

function harvestSource(creep, source) {
    log.debug(creep.name + ' moving to source: ' + source.id);
    creep.moveTo(source);
}