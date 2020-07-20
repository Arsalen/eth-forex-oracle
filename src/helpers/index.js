const config = require("../../config/app.config");

const EndPoint = require("./ep");

exports.sourceEp = new EndPoint(config.sourceHost);

exports.destinationEp = new EndPoint(config.destinationHost);

exports.ethereum = require("./eth");