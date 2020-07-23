const { sourceService } = require("../services");

module.exports = (pairs) => {
    
    return new Promise((resolve, reject) => {

        sourceService(pairs)
            .then(onfulfilled => {
                
                resolve(onfulfilled);
            })
            .catch(onrejected => {
                
                reject(onrejected);
            })
    })
}