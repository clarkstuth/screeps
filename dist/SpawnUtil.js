/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('SpawnUtil'); // -> 'a thing'
 */
var util = require('Util');
var creepUtil = require('CreepUtil');

var goals = {
    GATHER_ENERGY: "gather energy"
};

var states = {
    BUILD_ENERGY_WORKER: "build energy worker"
};

Spawn.prototype.initialize = function() {
    util.setNewMemory(this, 'goal', goals.GATHER_ENERGY);
    util.setNewMemory(this, 'state', states.BUILD_ENERGY_WORKER);
    util.setNewMemory(this, 'stateTickCount', 0);
    // energy routes is sourceId -> [workerIds]
    util.setNewMemory(this, 'energyRoutes', []);
    util.setNewMemory(this, 'assignedCreeps', 0);
    util.setNewMemory(this, 'unassignedCreeps', []);
    return this;
};

Spawn.prototype.determineState = function() {
    return this.initialize();
};

Spawn.prototype.gatherEnergy = function() {

    for (var i in Game.creeps) {
        console.log(Game.creeps[i]);
    }

    if (this.memory.state == states.BUILD_ENERGY_WORKER && this.spawning != null)
        return;


    if (this.memory.energyRoutes.length == 0) {
        this.addNewEnergyRoute();
    }

    this.buildWorkerForEnergyRoute();
};

Spawn.prototype.assignUnassignedCreeps = function() {

    while (this.memory.unassignedCreeps.length > 0) {
        var creepName = this.memory.unassignedCreeps.pop();

        var creep = Game.creeps[creepName];

        switch (creep.memory.job) {
            case creepUtil.jobs.HARVESTER:
                var sourceId;

                console.log('<<< creep');

                for (var i in this.memory.energyRoutes) {
                    if (sourceId == null || this.memory.energyRoutes[i].length < this.memory.energyRoutes[sourceId].length) {
                        sourceId = i;
                    }
                    break;
                }

                console.log(sourceId);

                creep.assignSource(Game.getObjectById(sourceId))
                this.memory.assignedCreeps++;

                break;
            default:
                return;
        }
    }
};

Spawn.prototype.buildWorkerForEnergyRoute = function() {
    var name = this.name + 'Harvester' + this.memory.energyRoutes.reduce(function(prev, curr, index, array) {
            return pref + curr.length();
        }, 0);

    console.log(name);

    var creep = creepUtil.create(this, creepUtil.HARVESTER_ARGS, name, creepUtil.jobs.HARVESTER);
    this.memory.unassignedCreeps.push(creep);
    // this.memory.energyRoutes[source.id].push(creep.id);
    // creep.assignSource(source);
};

Spawn.prototype.addNewEnergyRoute = function() {
    var source = this.pos.findClosestByPath(FIND_SOURCES);
    console.log(source);
    this.memory.energyRoutes[source.id] = [];
    return source;
};

Spawn.prototype.act = function() {
    this.memory.stateTickCount++;

    switch (this.memory.state) {
        case states.BUILD_ENERGY_WORKER:
            this.gatherEnergy();
            break;

        default:
            return;
    }

};
