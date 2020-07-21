require("dotenv").config({path: ".env"});

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const config = require("../../config/app.config");
const keystore = require("../../config/key.store");

const { Transaction, Message } = require("../models");

class Ethereum {

    constructor(_endPoint, _mnemonic) {

        this.hd = new HDWalletProvider(_mnemonic, _endPoint);
        this.web3 = new Web3(this.hd);
    }
    
    sign(_message) {

        let account = this.web3.eth.accounts.decrypt(keystore, process.env.PASSWORD);
        
        let message = new Message({
            from: account.address,
            to: _message.to,
            data: _message.data,
            chainId: _message.chainId,
            gas: _message.gas,
        })


        return new Promise((resolve, reject) => {

            account.signTransaction(message)
                .then(res => {

                    let tx = new Transaction(res);
                    resolve(tx);
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