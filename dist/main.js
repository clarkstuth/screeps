var log = require('Logger').createLogger('Main');

var creepPrototype = require('CreepPrototype');
var spawnPrototype = require('SpawnPrototype');

var creepLoop = require('CreepLoop');
var spawnLoop = require('SpawnLoop');

var turn = 0;

module.exports.loop = function () {

    log.debug('Start Turn: ' + turn++);

    spawnLoop.loop();
    creepLoop.loop();

    log.debug('End');
    log.debug('--------------------------------------');
};