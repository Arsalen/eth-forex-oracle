require("dotenv").config({path: ".env"});
const { sourceController, destinationController } = require("./controllers");
const { Item } = require("./models");

module.exports = () => {

    let pairs = process.env.PAIRS;

    sourceController(pairs)
        .then(response => {

            let item = new Item(response);
            
            destinationController(item)
                .then(res => {
                    
                    console.log(res);
                })
                .catch(err => {

                    console.error(err);
                })
        })
        .catch(error => {

            console.error(error);
        })
}