const { sourceEp } = require("../helpers");
const { Urls } = require("../settings");
const { logger } = require("../commons");

const { Item } = require("../models");

// --   FAKE    --
// module.exports = (pairs) => {

//     return new Promise((resolve, reject) => {

//                 let item = new Item({USDEUR:{rate:0.85796,timestamp:1595807525}, USDTND:{rate:2.71523,timestamp:1595807526}, USDJPY:{rate:105.68104,timestamp:1595807527}})

//                 logger.info(item);
//                 resolve(item);
//             })
// }

module.exports = (pairs) => {

    return new Promise((resolve, reject) => {

        sourceEp.get(Urls.sourceUrl, pairs)
            .then(onfulfilled => {

                let rates = JSON.parse(onfulfilled).rates;

                let item = new Item(rates)

                logger.info(item);
                resolve(item);
            })
            .catch(onrejected => {
                
                logger.err(onrejected);
                reject(onrejected);
            })
    })
}