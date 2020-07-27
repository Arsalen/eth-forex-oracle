const { destinationEp, database } = require("../helpers");
const { Urls } = require("../settings");

module.exports = (transaction) => {

    return new Promise((resolve, reject) => {

        destinationEp.post(Urls.destinationUrl, transaction)
            .then(onfulfilled => {

                let message = JSON.parse(onfulfilled);

                database.insert(message)
                    .then(response => {

                        resolve(response);
                    })
                    .catch(error => {

                        reject(error);
                    })
            })
            .catch(onrejected => {
                
                reject(onrejected);
            })
    })
}