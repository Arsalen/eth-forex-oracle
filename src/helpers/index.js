const config = require("../../config/app.config");

const EndPoint = require("./ep");

exports.sourceEp = new EndPoint(config.sourceHost, config.sourcePort);

exports.destinationEp = new EndPoint(config.destinationHost, config.destinationPort);

exports.database = require("./db");

exports.ethereum = require("./eth");