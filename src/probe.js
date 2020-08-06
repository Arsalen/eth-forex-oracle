require('dotenv').config({path: '.env'});
const { sourceController, destinationController } = require("./controllers");

const { signer } = require("./commons");



module.exports = () => {

    let pairs = process.env.PAIRS;

    sourceController(pairs)
        .then(onfulfilled => {


            Promise.all(

                onfulfilled.pairs.map(pair => {

                    return new Promise((resolve, reject) => {

                        signer.set(pair)
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            })
                    })
                })
            )
            .then(transactions => {

                transactions.map(tx => {

                    destinationController(tx)
                        .then(success => {
                            
                            console.log(JSON.stringify({ SUCCESS: success.result.tx }));
                        })
                        .catch(failure => {
        
                            console.error(JSON.stringify({ FAILURE: failure.result.tx }));
                        })
                })                
            })
            .catch(crap => {
                console.error(crap);
            })
        })
        .catch(onrejected => {

            console.error(onrejected);
        })
}