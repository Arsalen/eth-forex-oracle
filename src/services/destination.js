const { destinationEp, database } = require("../helpers");
const { Urls } = require("../settings");

const { Acknowledgement } = require("../models");

module.exports = (body) => {

    return new Promise((resolve, reject) => {

        destinationEp.post(Urls.destinationUrl, body)
            .then(onfulfilled => {

                let data = JSON.parse(onfulfilled);

                let ack = new Acknowledgement({
                    hash: data.hash,
                    status: data.status
                })

                database.insert(ack)
                    .then(response => {

                        resolve(response);
                    })
                    .catch(error => {

                        reject(error);
                    })
            })
            .catch(onrejected => {
                
                let data = JSON.parse(onrejected);

                let ack = new Acknowledgement({
                    hash: data.hash,
                    status: data.status
                })

                database.insert(ack)
                    .then(response => {

                        resolve(response);
                    })
                    .catch(error => {

                        reject(error);
                    })
            })
    })
}