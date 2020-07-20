const { sourceEp } = require("../helpers");
const { Urls } = require("../settings");

module.exports = (body) => {

    return new Promise((resolve, reject) => {

        sourceEp.get(Urls.sourceUrl, body)
            .then(onfulfilled => {

                resolve(onfulfilled);
            })
            .catch(onrejected => {
                
                reject(onrejected);
            })
    })
}