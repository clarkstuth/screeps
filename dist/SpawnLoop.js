var log = require('Logger').createLogger('SpawnLoop');
var spawnService = require('SpawnService');

module.exports.loop = function () {
    log.debug('Start');

    for (var name in Game.spawns) {
        var spawn = spawnService.byName(name);

        spawn.act();
    }

    log.debug('End');
};
