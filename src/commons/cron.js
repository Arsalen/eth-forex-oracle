var CronJob = require("cron").CronJob;


class Cron {

    constructor(_pattern, _cb) {

        this.pattern = _pattern;
        this.cb = _cb;
        this.job = new CronJob(this.pattern, this.cb);
    }

    start() {
        this.job.start();
    }

    stop() {
        this.job.stop();
    }
}


module.exports = Cron;