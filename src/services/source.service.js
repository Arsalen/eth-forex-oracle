const { sourceEp } = require("../helpers");
const { Urls } = require("../settings");
const { logger } = require("../commons");

const { Item } = require("../models");

module.exports = (pairs) => {

    return new Promise((resolve, reject) => {

        sourceEp.get(Urls.sourceUrl, pairs)
            .then(onfulfilled => {

                let rates = JSON.parse(onfulfilled).rates;

                let item = new Item(rates)

                logger.info(item);
                resolve(item);
            })
            .catch(onrejected => {
                
                logger.err(onrejected);
                reject(onrejected);
            })
    })
}