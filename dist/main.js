var log = require('Logger').createLogger('Main');

var spawnUtil = require('SpawnUtil');
var creepUtil = require('CreepUtil');

module.exports.loop = function () {

    log.debug('Start');

    spawnUtil.loop();
    creepUtil.loop();

    log.debug('End');
};