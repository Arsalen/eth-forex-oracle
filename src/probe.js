require('dotenv').config({path: '.env'});
const { sourceController, destinationController } = require("./controllers");

const { signer } = require("./commons");

module.exports = () => {

    let pairs = process.env.PAIRS;

    sourceController(pairs)
        .then(async onfulfilled => {


            await onfulfilled.pairs.map(pair => {

                signer.set(pair)
                    .then(response => {
                        destinationController(response)
                            .then(res => {
                            
                                console.log(JSON.stringify(res));
                            })
                            .catch(err => {
        
                                console.error(JSON.stringify(err));
                            })
                    })
                    .catch(error => {
                        console.error(error)
                    })
                    .finally(final => {

                    })
            })

        })
        .catch(onrejected => {

            console.error(onrejected);
        })
}