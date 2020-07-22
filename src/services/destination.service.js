const { destinationEp, database } = require("../helpers");
const { Urls } = require("../settings");

const { Receipt } = require("../models");

module.exports = (body) => {

    return new Promise((resolve, reject) => {

        destinationEp.post(Urls.destinationUrl, body)
            .then(onfulfilled => {

                let data = JSON.parse(onfulfilled);

                let receipt = new Receipt(data);

                database.insert(receipt)
                    .then(response => {

                        resolve(response);
                    })
                    .catch(error => {

                        reject(error);
                    })
            })
            .catch(onrejected => {
                
                let data = JSON.parse(onrejected);

                let receipt = new Receipt(data);

                database.insert(receipt)
                    .then(response => {

                        resolve(response);
                    })
                    .catch(error => {

                        reject(error);
                    })
            })
    })
}