function Game() {
    this.cpu = {
        /** @type number */
        limit: 0,
        /** @type number */
        tickLimit: 0,
        /** @type number */
        bucket: 0
    };

    /** @type {Object.<string, Creep>} */
    this.creeps = {};

}

/**
 *
 * @param {string} id
 * @return {Creep|Spawn|Source}
 */
Game.getObjectById = function(id) {

};