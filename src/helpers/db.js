const config = require("../../config/app.config");

const NeDB = require("nedb");

class DataBase {

    constructor() {

        this.nedb = new NeDB({ filename: `./db/${config.db.name}.db`, autoload: true });
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
}

module.exports = new DataBase();