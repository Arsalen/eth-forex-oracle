require("dotenv").config({path: ".env"});

var config = require("./config/app.config");
var { Cron } = require("./src/commons");
var probe = require("./src/probe");

probe()

var job = new Cron(config.pattern, () => {
    probe();
})

job.start();