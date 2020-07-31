require("dotenv").config({path: ".env"});

var config = require("./config/app.config");
var { Cron } = require("./src/commons");
var probe = require("./src/probe");

var job = new Cron(config.cron.pattern, () => {
    probe();
})

job.start();