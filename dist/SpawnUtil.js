/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('SpawnUtil'); // -> 'a thing'
 */
var util = require('Util');
var creepUtil = require('CreepUtil');

var log = require('Logger').createLogger('SpawnUtil');

var GOALS = {
    GATHER_ENERGY: "gather energy"
};

var STATES = {
    BUILD_ENERGY_WORKER: "build energy worker"
};

module.exports.loop = function () {

    log.debug('Start Loop');

    for (var spawn in Game.spawns) {
        spawn = Game.spawns[spawn];

        spawn.determineNextAction();
        spawn.assignUnassignedCreeps();
        spawn.act();
    }

    log.debug('End Loop');
};


Spawn.prototype.determineNextAction = function () {
    log.debug(this.name + ' determining next action.');
    initialize(this);
};

Spawn.prototype.assignUnassignedCreeps = function () {

    log.debug(this.name + ' assigning unassigned creeps.');

    while (this.memory.unassignedCreeps.length > 0) {
        var creepName = this.memory.unassignedCreeps.pop();

        log.debug('assigning ' + creepName);
        var creep = Game.creeps[creepName];

        assignCreep(this, creep);
    }

    log.debug(this.name + ' no more creeps to assign.');
};

function initialize(spawn) {
    util.setNewMemory(spawn, 'goal', GOALS.GATHER_ENERGY);
    util.setNewMemory(spawn, 'state', STATES.BUILD_ENERGY_WORKER);
    util.setNewMemory(spawn, 'stateTickCount', 0);
    // energy routes is sourceId -> [workerIds]
    util.setNewMemory(spawn, 'energyRoutes', []);
    util.setNewMemory(spawn, 'assignedCreeps', 0);
    util.setNewMemory(spawn, 'unassignedCreeps', []);
    return spawn;
}

function assignCreep(spawn, creep) {
    log.debug('creep is ' + creep.memory.job);
    switch (creep.memory.job) {

        case creepUtil.jobs.HARVESTER:

            if (assignCreepToAvailableRoute(creep, spawn.memory.energyRoutes))
                break;

            break;
        default:
            log.warn('No job assigned for ' + creep.name);
            return;
    }
}

// return false if cannot be assigned.
function assignCreepToAvailableRoute(creep, routes) {
    if (this.memory.energyRoutes.length > 0) {
        log.warn('No available source to harvest.');
        return false;
    }

    // sourceId of harvest route with lowest number of workers
    var sourceId = null;
    for (var i in routes) {
        if (sourceId == null || routes[i].length < routes[sourceId].length) {
            sourceId = i;
        }
    }

    log.debug('Assign ' + creep.name + ' to source: ' + sourceId);
    creep.assignSource(sourceId);
    this.memory.assignedCreeps++;
}

Spawn.prototype.gatherEnergy = function () {

    for (var i in Game.creeps) {
        console.log(Game.creeps[i]);
    }

    if (this.memory.state == STATES.BUILD_ENERGY_WORKER && this.spawning != null)
        return;


    if (this.memory.energyRoutes.length == 0) {
        this.addNewEnergyRoute();
    }

    this.buildWorkerForEnergyRoute();
};

Spawn.prototype.buildWorkerForEnergyRoute = function () {
    var name = this.name + 'Harvester' + this.memory.energyRoutes.reduce(function (prev, curr, index, array) {
            return pref + curr.length();
        }, 0);

    console.log(name);

    var creep = creepUtil.create(this, creepUtil.HARVESTER_ARGS, name, creepUtil.jobs.HARVESTER);
    this.memory.unassignedCreeps.push(creep);
    // this.memory.energyRoutes[source.id].push(creep.id);
    // creep.assignSource(source);
};

Spawn.prototype.addNewEnergyRoute = function () {
    var source = this.pos.findClosestByPath(FIND_SOURCES);
    console.log(source);
    this.memory.energyRoutes[source.id] = [];
    return source;
};

Spawn.prototype.act = function () {
    this.memory.stateTickCount++;

    switch (this.memory.state) {
        case STATES.BUILD_ENERGY_WORKER:
            this.gatherEnergy();
            break;

        default:
            return;
    }

};
