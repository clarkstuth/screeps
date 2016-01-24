/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepUtil'); // -> 'a thing'
 */

var log = require('Logger').createLogger('CreepUtil');

var JOBS = {
    HARVESTER: 'harvester'
};
module.exports.jobs = JOBS;

var ARGS = {
    HARVESTER_ARGS: [MOVE, WORK, CARRY]
};
module.exports.args = ARGS;

module.exports.loop = function() {
    log.debug('Start Loop');

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.act();
    }

    log.debug('End Loop');
};

Creep.prototype.act = function() {
    log.debug(this.name + ' Acting');
    this.harvest();
};

Creep.prototype.harvest = function() {
    log.debug(this.name + ' Harvesting');
    var spawn = Game.getObjectById(this.memory.spawnId);
    var source = Game.getObjectById(this.memory.sourceId);

    if (this.carry.energy == this.carryCapacity) {
        if (this.transfer(spawn, RESOURCE_ENERGY) != OK) {
            log.debug(this.name + ' moving to ' + spawn);
            this.moveTo(spawn);
        } else {
            log.debug(this.name + ' transferred energy to ' + spawn);
        }
    } else if (this.harvest(source) != OK) {
        log.debug(this.name + ' moving to source: ' + source.id);
        this.moveTo(source);
    } else {
        log.debug(this.name + ' harvesting source: ' + source.id);
    }
};

module.exports.create = function(spawn, args, name, job) {
    var memory = {'job': job, 'spawnId': spawn.id};
    log.debug('Creating new creep ' + name + '[' + args + '] - ' + JSON.stringify(memory));

    var err = spawn.createCreep(args, name, memory);
    if (err == OK) {
        return true;
    }

    log.warn(spawn.name + ' could not create ' + name + '.  Error: ' + err);
    return false;
};

Creep.prototype.assignSource = function(source) {
    var spawn = Game.getObjectById(this.memory.spawnId);
    log.debug(this.name + ' harvesting between source: ' + this.memory.sourceId + ' and spawn: ' + spawn.name);
    this.memory.sourceId = source.id;
};