var log = require('Logger').createLogger('CreepAction');

/**
 *
 * @param {Creep} creep
 */
module.exports.harvestAction = function (creep) {
    log.debug(creep.name + ' Harvesting');

    /** @type {Spawn} */
    var spawn = Game.getObjectById(creep.memory.spawnId);
    var source = Game.getObjectById(creep.memory.sourceId);

    if (creep.carry.energy == creep.carryCapacity) {
        transferToSpawn(creep, spawn);
    } else if (creep.harvest(source) != OK) {
        harvestSource(creep, source);
    }
};

/**
 *
 * @param {Creep} creep
 * @param {Spawn} spawn
 */
function transferToSpawn(creep, spawn) {
    if (creep.transfer(spawn, RESOURCE_ENERGY) != OK) {
        log.debug(creep.name + ' moving to ' + spawn);
        creep.moveTo(spawn);
    } else {
        log.debug(creep.name + ' transferred energy to ' + spawn);
    }
}

/**
 *
 * @param {Creep} creep
 * @param {Source} source
 */
function harvestSource(creep, source) {
    log.debug(creep.name + ' moving to source: ' + source.id);
    creep.moveTo(source);
}