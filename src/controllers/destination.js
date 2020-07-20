const { destinationService } = require("../services");

const { ethereum } = require("../helpers");


module.exports = (body) => {

    return new Promise((resolve, reject) => {

        ethereum.sign(body)
            .then(response => {

                destinationService(response)
                    .then(onfulfilled => {

                        let data = JSON.parse(onfulfilled).ack;
                        resolve(data);
                    })
                    .catch(onrejected => {
                
                        reject(onrejected);
                    })
            })
            .catch(error => {
                
                reject(error);
            })
    })
}