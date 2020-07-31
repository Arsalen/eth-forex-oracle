require('dotenv').config({path: '.env'});
const { sourceController, destinationController } = require("./controllers");

const { signer } = require("./commons");

module.exports = () => {

    let pairs = process.env.PAIRS;

    let transactions = [];

    sourceController(pairs)
        .then(onfulfilled => {

            onfulfilled.pairs.map(pair => {

                signer.set(pair)
                    .then(response => {
                        transactions.push(response);
                    })
                    .catch(error => {
                        console.error(error)
                    })
                    .finally(final => {

                        destinationController(transactions)
                            .then(res => {
                            
                                console.log(JSON.stringify(res));
                            })
                            .catch(err => {
        
                                console.error(JSON.stringify(err));
                            })
                    })
            })
        })
        .catch(onrejected => {

            console.error(onrejected);
        })
}