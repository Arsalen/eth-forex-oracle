const { sourceService } = require("../services");

module.exports = (body) => {
    
    return new Promise((resolve, reject) => {

        sourceService(body)
            .then(onfulfilled => {
                
                let data = JSON.parse(onfulfilled).rates;
                resolve(data);
            })
            .catch(onrejected => {
                
                reject(onrejected);
            })
    })
}