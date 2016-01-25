var log = require('Logger').createLogger('CreepService');

/**
 * Gets a new creep, performing any necessary setup.
 * @param name
 * @returns {Creep} creep matching the name
 */
module.exports.get = function(name) {
    return Game.creeps[name];
};

/**
 * Creates a new creep.
 * @param spawn Spawn instance to use.
 * @param args Standard creation arguments from CreepArgs.creationArgs
 * @param name Name
 * @param job Job from CreepArgs.jobs
 * @returns {boolean} true on success, false on failure
 */
module.exports.create = function(spawn, args, name, job) {
    var defaultMemory = {job: job,  spawnId: spawn.id, action: null, actionTime: 0, interrupted: false};
    log.debug('Creating new creep ' + name + '[' + args + '] - ' + JSON.stringify(defaultMemory));

    // todo - spawn service
    var nameOrError = spawn.createCreep(args, name, defaultMemory);
    if (nameOrError == name) {
        return true;
    }

    log.warn(spawn.name + ' could not create ' + name + '.  Error: ' + nameOrError);
    return false;
};