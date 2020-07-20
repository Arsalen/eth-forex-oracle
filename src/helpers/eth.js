require("dotenv").config({path: ".env"});

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const config = require("../../config/app.config");
const keystore = require("../../config/keystore");

const { Transaction, Message } = require("../models");

class Ethereum {

    constructor(_endPoint) {

        this.mnemonic = process.env.MNEMONIC.trim();
        this.provider = new HDWalletProvider(this.mnemonic, _endPoint);
        this.web3 = new Web3(this.provider);
    }
    
    sign(_data) {

        let account = this.web3.eth.accounts.decrypt(keystore, process.env.PASSWORD);
        
        let message = new Message({
            from: account.address,
            to: config.dappAddress,
            data: this.web3.utils.toHex(_data),
            chainId: config.network,
            gas: config.gasLimit,
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

module.exports = new Ethereum(endPoint);;