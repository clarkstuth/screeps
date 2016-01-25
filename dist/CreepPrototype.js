var log = require('Logger').createLogger('Creep');

var creepArgs = require('CreepArgs');
var creepActions = require('CreepActions');

/**
 * Creep performs standard action.
 */
Creep.prototype.act = function() {
    log.debug(this.name + ' Acting');

    switch (this.memory.action) {
        case creepArgs.actions.HARVEST_ACTION:
            creepActions.harvestAction(creep);
            break;

        default:
            log.warn(this.name - ' No action performed');
    }

    this.harvestAction();
};

Creep.prototype.setSource = function(sourceId, routes) {
    this.memory.sourceId = sourceId;
    log.debug(this.name + ' harvesting from source: ' + this.memory.sourceId);
};