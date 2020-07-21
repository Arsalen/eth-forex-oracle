const { destinationService } = require("../services");

const { ethereum } = require("../helpers");


module.exports = (body) => {


    return Promise.all(

        body.pairs.map(data => {

            return new Promise((resolve, reject) => {
    
                ethereum.sign(data)
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
        })
    )
        .then(onfulfilled => {
            return onfulfilled;
        })
        .catch(onrejected => {
            return onrejected;
        })
}