const NeDB = require("nedb");

class DataBase {

    constructor() {
        this.nedb = new NeDB({ filename: "./db/transactions.db", autoload: true });
    }

    insert(data) {

        return new Promise((resolve, reject) => {

            this.nedb.insert(data, (onrejected, onfulfilled) => {

                if(onfulfilled)
                    resolve(onfulfilled);
                reject(onrejected);
            });
        })
    }

    find(data=null) {

        return new Promise((resolve, reject) => {

            this.nedb.find(data, onfulfilled => {

                if(onfulfilled)
                    resolve(onfulfilled);
                reject(null);
            })
        })
    }


}

module.exports = new DataBase();