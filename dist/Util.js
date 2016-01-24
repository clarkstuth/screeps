/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Util'); // -> 'a thing'
 */
module.exports.setNewMemory = function(object, key, value) {
    if (object.memory[key] == null)
        object.memory[key] = value;
};