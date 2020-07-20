const { destinationService } = require("../services");

const { ethereum } = require("../helpers");


module.exports = (body) => {

    return new Promise((resolve, reject) => {

        ethereum.sign(body)
            .then(response => {

                destinationService(response)
                    .then(onfulfilled => {

                        resolve(onfulfilled);
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