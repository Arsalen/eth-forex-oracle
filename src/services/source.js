const { sourceEp } = require("../helpers");
const { logger } = require("../commons");
const { Urls } = require("../settings");

module.exports = (body) => {

    return new Promise((resolve, reject) => {

        sourceEp.get(Urls.sourceUrl, body)
            .then(onfulfilled => {

                logger.info(onfulfilled);
                resolve(onfulfilled);
            })
            .catch(onrejected => {
                
                logger.err(onrejected);
                reject(onrejected);
            })
    })
}