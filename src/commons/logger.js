const Winston = require('winston');

class Logger {

    constructor() {
        this.winston = Winston.createLogger({
            format: Winston.format.json(),
            defaultMeta: { date: new Date() },
            transports: [
                new Winston.transports.Console(),
                new Winston.transports.File({ filename: './logs/info.log', level: 'info' }),
                new Winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
                new Winston.transports.File({ filename: './logs/error.log', level: 'error' }),
            ],
          });
    }

    info(message) {
        this.winston.info(JSON.stringify(message));
    }

    warn(message) {
        this.winston.warn(JSON.stringify(message));
    }

    err(message) {
        this.winston.error(JSON.stringify(message));
    }
}

module.exports = new Logger();