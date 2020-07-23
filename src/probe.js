require('dotenv').config({path: '.env'});
const { sourceController, destinationController } = require("./controllers");

module.exports = () => {

    let pairs = process.env.PAIRS;

    sourceController(pairs)
        .then(onfulfilled => {
            
            destinationController(onfulfilled)
                .then(response => {
                    
                    console.log(response);
                })
                .catch(error => {

                    console.error(error);
                })
        })
        .catch(onrejected => {

            console.error(onrejected);
        })
}