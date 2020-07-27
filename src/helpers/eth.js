require("dotenv").config({path: ".env"});

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const config = require("../../config/app.config");
const keystore = require("../../config/key.store");

const { Transaction, EthMessage } = require("../models");

class Ethereum {

    constructor(_endPoint, _mnemonic) {

        this.hd = new HDWalletProvider(_mnemonic, _endPoint);
        this.web3 = new Web3(this.hd);
    }
    
    sign(data) {

        let account = this.web3.eth.accounts.decrypt(keystore, process.env.PASSWORD);
        
        let message = new EthMessage({
            from: account.address,
            to: data.to,
            data: data.data,
            chainId: data.chainId,
            gas: data.gas,
        })


        return new Promise((resolve, reject) => {

            account.signTransaction(message)
                .then(res => {

                    let transaction = new Transaction(res);
                    resolve(transaction);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

const endPoint = `${config.infuraEndPoint}${process.env.INFURA_API_KEY}`;
const mnemonic = process.env.MNEMONIC.trim();

module.exports = new Ethereum(endPoint, mnemonic);;