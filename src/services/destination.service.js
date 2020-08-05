const { destinationEp, database } = require("../helpers");
const { Urls } = require("../settings");

const { logger } = require("../commons");

module.exports = (transaction) => {

    return new Promise((resolve, reject) => {

        destinationEp.post(Urls.destinationUrl, transaction)
            .then(onfulfilled => {

                let message = JSON.parse(onfulfilled);

                database.insert(message)
                    .then(response => {

                        logger.info(response);
                        resolve(response);
                    })
                    .catch(error => {

                        logger.err(error);
                        reject(error);
                    })
            })
            .catch(onrejected => {
                
                reject(onrejected);
            })
    })
}