var log = require('Logger').createLogger('Main');

var spawnUtil = require('SpawnUtil');
var creepUtil = require('CreepUtil');

var turn = 0;

module.exports.loop = function () {

    log.debug('Start Turn: ' + turn++);

    spawnUtil.loop();
    creepUtil.loop();

    log.debug('End');
};