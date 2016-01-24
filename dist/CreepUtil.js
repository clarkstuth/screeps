/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepUtil'); // -> 'a thing'
 */

// edit
module.exports.jobs = {
    HARVESTER: 'harvester'
};

module.exports.HARVESTER_ARGS = [MOVE, WORK, CARRY];

module.exports.loop = function() {
    Game.creeps.act();
}

module.exports.create = function(spawn, args, name, job) {
    var memory = {'job': job, 'spawnId': spawn.id};
    return spawn.createCreep(args, name, memory);
};

Creep.prototype.assignSource = function(source) {
    this.memory.sourceId = source.id;
};

Creep.prototype.act = function() {
    this.harvest();
};

Creep.prototype.harvest = function() {
    var spawn = Game.getObjectById(this.memory.spawnId);
    var source = Game.getObjectById(this.memory.sourceId);

    if (this.carry.energy == this.carryCapacity) {
        if (this.transfer(spawn, RESOURCE_ENERGY) != OK) {
            this.moveTo(spawn);
        }
    } else if (this.harvest(source) != OK) {
        this.moveTo(source);
    }
};