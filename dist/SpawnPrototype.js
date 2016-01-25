var log = require('Logger').createLogger('Spawn');

var creepService = require('CreepService');
var spawnArgs = require('SpawnArgs');
var creepArgs = require('CreepArgs');

Spawn.prototype.act = function () {
    log.debug(this.name + ' acting');
    this.memory.stateTickCount++;

    determineNextAction(this);
    assignUnassignedCreeps(this);
    determineConstruction(this);
};

function determineNextAction(spawn) {
    log.debug(spawn.name + ' determining next action.');
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
}

function assignCreep(spawn, creep) {
    switch (creep.memory.job) {

        case creepArgs.jobs.HARVESTER:
            if (assignCreepToEnergy(creep, spawn.memory.energyRoutes))
                break;

        default:
            log.warn('No job assigned for ' + creep.name);
            return;
    }
}

// return false if cannot be assigned.
function assignCreepToEnergy(creep, routes) {
    if (routes.length <= 0) {
        log.warn('No available source to harvest.');
        return false;
    }

    // sourceId of harvest route with lowest number of workers
    var sourceId = null;
    var sourceIndex = null;
    routes.forEach(function (element, index) {
        if (element != null && (sourceId == null || element.workers.length < routes[index].length)) {
            sourceId = element.id;
            sourceIndex = index;
        }
    });

    log.debug('Assign ' + creep.name + ' to source: ' + routes[sourceIndex].id);
    creep.assignSource(sourceId, routes);

    routes[sourceIndex].workers.push(creep.name);
}

function determineConstruction(spawn) {
    if (spawn.spawning)
        return;

    switch (spawn.memory.state) {
        case spawnArgs.construct.BUILD_ENERGY_WORKER:
            if (buildEnergyWorker(spawn))
                break;

        default:
            log.warn(spawn.name + ' no construction decision.');
    }
}

function buildEnergyWorker(spawn) {
    console.log(spawn.name + ' building energy worker.');

    var name = spawn.name + 'Harvester' + spawn.memory.energyRoutes.reduce(function (prev, curr, index, array) {
            return curr == null ? prev : prev + curr.workers.length;
        }, 0);

    if (creepUtil.create(spawn, creepUtil.args.HARVESTER_ARGS, name, creepUtil.jobs.HARVESTER)) {
        spawn.memory.unassignedCreeps.push(name);
        return true;
    }

    return false;
}