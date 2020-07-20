const { destinationEp } = require("../helpers");
const { Urls } = require("../settings");

module.exports = (body) => {

    return new Promise((resolve, reject) => {

        destinationEp.post(Urls.destinationUrl, body)
            .then(onfulfilled => {

                resolve(onfulfilled);
            })
            .catch(onrejected => {
                
                reject(onrejected);
            })
    })
}