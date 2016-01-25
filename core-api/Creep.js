function Creep() {

    this.memory = {};

    this.carry = {
        energy: {}
    };

    /** @type{number} */
    this.energyCapacity = 0;

    /** @type{number} */
    this.carryCapacity = 0;

    /** @type{string} */
    this.name = '';

}

/**
 *
 * @param {Source} source
 */
Creep.prototype.harvest = function (source) {
};

/**
 *
 * @param {Spawn|Source} target
 */
Creep.prototype.moveTo = function(target) {

};

/**
 *
 * @param {Spawn} spawn
 * @param {string} resourceType
 */
Creep.prototype.transfer = function (spawn, resourceType) {
};
