var log = require('Logger').createLogger('SpawnService');
var util = require('Util');
var energyRoute = require('EnergyRoute');
var spawnArgs = require('SpawnArgs');

module.exports.byName = function (name) {
    return initialize(Game.spawns[name]);
};

function initialize(spawn) {
    util.setNewMemory(spawn, 'goal', spawnArgs.goals.GATHER_ENERGY);
    util.setNewMemory(spawn, 'construct', spawnArgs.construct.BUILD_ENERGY_WORKER);
    util.setNewMemory(spawn, 'stateTickCount', 0);
    util.setNewMemory(spawn, 'unassignedCreeps', []);

    if (util.setNewMemory(spawn, 'energyRoutes', [])) {
        trackEnergyRoutesInRoom(spawn);
    }

    return spawn;
}

function trackEnergyRoutesInRoom(spawn) {
    log.debug(spawn.name + ' initializing energy routes');
    var spawnPos = spawn.pos;

    var sources = spawn.room.find(FIND_SOURCES);
    for (var i in sources) {
        var dist = spawnPos.findPathTo(sources[i]).length;
        spawn.memory.energyRoutes[dist] = energyRoute.create(sources[i].id);
    }
}
