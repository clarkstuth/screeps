var log = require('Logger').createLogger('Main');

var creepPrototype = require('CreepPrototype');
var spawnPrototype = require('SpawnPrototype');

var turn = 0;

module.exports.loop = function () {

    log.debug('Start Turn: ' + turn++);

    spawnUtil.loop();
    creepUtil.loop();

    log.debug('End');
    log.debug('--------------------------------------');
};