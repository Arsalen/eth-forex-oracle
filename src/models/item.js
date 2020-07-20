const { Utils } = require("../commons");
const Pair = require("./pair");

class Item {

    constructor(props) {

        this.pairs = Utils.mapper(props).map(p => {
            return {
                [Object.keys(p)[0]]: new Pair(Object.values(p)[0])
            };
        })
    }
}

module.exports = Item;