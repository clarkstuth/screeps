var log = require('Logger').createLogger('EnergyRoute');

module.exports.create = function(id) {
    return {id: id, workers: []};
};