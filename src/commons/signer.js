const wrapper = require("../wrapper");

exports.set = (pair) => {

    return new Promise((resolve, reject) => {

        wrapper.appContract.set(pair)
            .then(onfulfilled => {
                resolve(onfulfilled);
            })
            .catch(onrejected => {
                reject(onrejected);
            })
    })
}