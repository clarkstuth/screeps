var log = require('Logger').createLogger('CreepLoop');

var creepService = require('CreepService');

module.exports.loop = function() {
    log.debug('Start');

    for (var name in Game.creeps) {
        var creep = creepService.get(name);
        creep.determineAction();
        creep.act();
    }

    log.debug('End');
};