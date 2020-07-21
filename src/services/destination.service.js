const { destinationEp, database } = require("../helpers");
const { Urls } = require("../settings");

const { Acknowledgement } = require("../models");

module.exports = (body) => {

    return new Promise((resolve, reject) => {

        destinationEp.post(Urls.destinationUrl, body)
            .then(onfulfilled => {

                let data = JSON.parse(onfulfilled);

                console.log("data: ", data)

                let ack = new Acknowledgement({
                    transactionHash: data.hash,
                    confirmation: data.confirmation
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
                    transactionHash: data.hash,
                    confirmation: data.confirmation
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