function Logger(name) {
    this.name = name;
}

var SEVERITY = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
};
Logger.prototype.severities = SEVERITY;

Logger.prototype.logWithSeverity = function (severity, message) {
    console.log('[' + this.name + '] [' + severity + ']  ' + message);
};

Logger.prototype.info = function (message) {
    this.logWithSeverity(SEVERITY.INFO, message);
};

Logger.prototype.debug = function (message) {
    this.logWithSeverity(SEVERITY.DEBUG, message);
};

Logger.prototype.error = function (message) {
    this.logWithSeverity(SEVERITY.ERROR, message);
};

Logger.prototype.warn = function (message) {
    this.logWithSeverity(SEVERITY.WARNING, message);
};

module.exports.createLogger = function (name) {
    return new Logger(name);
};