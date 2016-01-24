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

        spawn.act();
    }

    log.debug('End Loop');
};

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

Spawn.prototype.addNewEnergyRoute = function () {
    var source = this.pos.findClosestByPath(FIND_SOURCES);
    console.log(source);
    this.memory.energyRoutes[source.id] = [];
    return source;
};

Spawn.prototype.act = function () {
    log.debug(this.name + ' acting');
    this.memory.stateTickCount++;

    determineNextAction(spawn);
    assignUnassignedCreeps(spawn);
    determineConstruction(spawn);

};

function determineNextAction(spawn) {
    log.debug(spawn.name + ' determining next action.');
    initialize(spawn);
}

function assignUnassignedCreeps(spawn) {

    if (spawn.memory.unassignedCreeps < 1)
        return;

    log.debug(spawn.name + ' assigning unassigned creeps.');
    while (spawn.memory.unassignedCreeps.length > 0) {
        var creepName = spawn.memory.unassignedCreeps.pop();
        log.debug('assigning ' + creepName);
        var creep = Game.creeps[creepName];
        assignCreep(spawn, creep);
    }
    log.debug(spawn.name + ' no more creeps to assign.');
}

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
    if (routes.length > 0) {
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

function determineConstruction(spawn) {
    if (spawn.spawning)
        return;

    switch (spawn.memory.state) {
        case STATES.BUILD_ENERGY_WORKER:
            if (buildEnergyWorker(spawn))
                break;

        default:
            log.warn(spawn.name + ' no construction decision.');
    }
}

function buildEnergyWorker(spawn) {
    var name = spawn.name + 'Harvester' + spawn.memory.energyRoutes.reduce(function (prev, curr, index, array) {
            return pref + curr.length();
        }, 0);

    console.log(spawn.name + ' creating ' + name);

    var creep = creepUtil.create(this, creepUtil.args.HARVESTER_ARGS, name, creepUtil.jobs.HARVESTER);
    this.memory.unassignedCreeps.push(creep);
    return true;
}
