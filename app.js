require("dotenv").config({path: ".env"});

var config = require("./config/app.config");
var { Cron } = require("./src/commons");
var probe = require("./src/probe");

setTimeout(() => {
    probe();
    
}, 10000);

var job = new Cron(config.cron.pattern, () => {
    probe();
})

job.start();