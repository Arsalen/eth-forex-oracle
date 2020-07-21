const { destinationService } = require("../services");

const wrapper = require("../wrapper");

module.exports = (item) => {


    return Promise.all(

        item.pairs.map(pair => {

            return new Promise((resolve, reject) => {

                wrapper.forexContract.set(pair)
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