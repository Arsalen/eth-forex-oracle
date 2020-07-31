const config = require("../../config/app.config");

const EndPoint = require("./ep");

exports.sourceEp = new EndPoint(config.source.host, config.source.port);

exports.destinationEp = new EndPoint(config.destination.host, config.destination.port);

exports.database = require("./db");

exports.ethereum = require("./eth");