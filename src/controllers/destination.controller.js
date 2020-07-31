const { destinationService } = require("../services");

module.exports = (transaction) => {

    return new Promise((resolve, reject) => {

        destinationService(transaction)
            .then(response => {

                resolve(response);
            })
            .catch(error => {
            
                reject(error);
            })
    })

    // return Promise.all(

    //     transactions.map(transaction => {

    //         return new Promise((resolve, reject) => {

    //             destinationService(transaction)
    //                 .then(response => {
    
    //                     resolve(response);
    //                 })
    //                 .catch(error => {
                    
    //                     reject(error);
    //                 })
    //         })
    //     })
    // )
    //     .then(onfulfilled => {
    //         return onfulfilled;
    //     })
    //     .catch(onrejected => {
    //         throw onrejected;
    //     })
}