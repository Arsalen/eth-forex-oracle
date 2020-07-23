const { destinationService } = require("../services");

const wrapper = require("../wrapper");

module.exports = (item) => {


    return Promise.all(

        item.pairs.map(pair => {

            return new Promise((resolve, reject) => {

                wrapper.forexContract.set(pair)
                    .then(response => {

                        destinationService(response)
                            .then(success => {
    
                                resolve(success);
                            })
                            .catch(failure => {
                    
                                reject(failure);
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