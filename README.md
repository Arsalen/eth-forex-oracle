# eth-oracle

First out of three components of the ethereum-oracle-api-dapp project:
  - ethereum oracle
  - [ethereum API server](https://github.com/Arsalen/eth-api)
  - [ethereum sample dapp](https://github.com/Arsalen/eth-forex-dapp)

## Overview

An oracle that refers to [a foreign exchange](http://freeforexapi.com/) market price rates and submit updates to a sample dapp deployed on [ropsten](https://ropsten.etherscan.io/) through a web service exposed within a RESTful API secured by a basic authentication method.

Data are first extracted from the source in a predefined cron, then signed and finally forwarded to the destination server.

### What is an oracle?

An oracle is a service that provides “trusted” data to a smart contract, through transactions. “Trusted” because, trust is a personal issue. Two entities might not “trust” data in the same way, given some specific implementation of an oracle.

Oracles are typically web services that implement some blockchain-specific functionalities, such as hashing and signing some data, or creating and submitting new transactions to the network.

## Components

Extraction, signature and submission of transactions are controlled by a wide range of services, helpers and common utilities, we name a few for simplicity:
  - Source controller: Gather data from source, connection is established through REST.
  - Probe service: Orchestrate concurrent processes, triggered once every cron.
  - Destination controller: Submit data to destination, connection is established through REST.
  - Helpers: Manage connections with end points, database and Infura.
  - Commons: Manage cron, logs, format and signature services.

![alt text](https://github.com/Arsalen/eth-oracle/blob/master/architecture.jpg?raw=true)

## Prerequisites

On a [ubuntu server](https://releases.ubuntu.com/18.04/), install [PM2](https://pm2.keymetrics.io/) to launch the oracle as a daemon service.
On [Infura](https://infura.io/), setup a new project to connect to ropsten.
On [MEW](https://www.myetherwallet.com/), generate a wallet through a mnemonic phrase, download keystore file and fund the address with some [fake ether](https://faucet.ropsten.be/).

### Configuration

Configuration and secret files are omitted, you can though setup your own if you have managed to follow the prerequisites.

```.env```

```INI
PAIRS=["USDEUR", "USDTND"]  # Pairs you desire to submit their rates to the contract.

MNEMONIC="one two three four five six seven eight nine ten eleven twelve" # Mnemonic passphrase

SECRET="a1B2c3D4e5F6g7H"  # Secret to decrypt keystore

LOGIN="abc" # Basic auth username you used to register to the API

PASSWORD="xyz"  # Basic auth password you used to register to the API
```

```app.process.js```

```JS
module.exports = {
    apps: [{
        name: 'eth-oracle',
        script: 'app.js',
        args: '',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
    }]
};
```

```config/app.config.json``` 

```JSON
{
    "source":{
        "host": "www.freeforexapi.com",
        "port": 80
    },
    "destination":{
        "host": "<ip>",
        "port": 3000
    },
    "infura":{
        "endPoint": "https://ropsten.infura.io/v3/",
        "key": "abcd1efgh2ijkl3mnop4qrst5uvwx6yz"
    },
    "blockchain":{
        "gasLimit": 100000,
        "network": 3
    },
    "db": {
        "name": "application"
    },
    "cron":{
        "pattern": "*/2 * * * *"
    }
 }
```

```key.store.js```

```JS
require("dotenv").config({path: ".env"});

const HDWalletProvider = require("truffle-hdwallet-provider");
const ethers = require('ethers');
const Web3 = require('web3');

const config = require("./config/app.config");

const mnemonic = process.env.MNEMONIC;
const password = process.env.SECRET;

const endPoint = `${config.infura.endPoint}${config.infura.key}`;

const wallet = ethers.Wallet.fromMnemonic(mnemonic);

const provider = new HDWalletProvider(mnemonic, endPoint);
const web3 = new Web3(provider);

const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
const keystore = web3.eth.accounts.encrypt(account.privateKey, password);

console.log(JSON.stringify(keystore));
```

```config/key.store.json``` From https://www.myetherwallet.com/create-wallet then encrypted using key.store.js

```JSON
{"version":3,"id":"<id>","address":"<address","crypto":{"ciphertext":"<crypto.ciphertext>","cipherparams":{"iv":"<crypto.cipherparams.iv>"},"cipher":"<crypto.cipher>","kdf":"<cryoto.kdf>","kdfparams":{"dklen":"<crypto.kdfparams.dklen>","salt":"<crypto.kdfparams.salt>","n":"<crypto.kdfparams.n>","r":"<crypto.kdfparams.dkler>","p":"<crypto.kdfparams.p>"},"mac":"<crypto.mac>"}}
```

``` artifacts/App.json ``` From https://github.com/Arsalen/eth-forex-dapp.git

```JSON
{
  "contractName": "<contractname>",
  "abi": ["<abi..>"],
  "metadata": "<metadata>",
  "bytecode": "<bytecode>",
  "sourceMap": "<sourceMap>",
  "deployedSourceMap": "<deployedSourceMap>",
  "source": "<source>",
  "sourcePath": "<sourcePath>",
  "ast": {"<ast>"},
  "legacyAST": {"<legacyAST>"},
  "compiler": {"<compiler>"},
  "networks": {"<networks>"},
  "schemaVersion": "<schemaVersion>",
  "updatedAt": "<updatedAt>",
  "devdoc": {
    "methods": {"<devdoc.methods>"}
  },
  "userdoc": {
    "methods": {"<userdoc.methods>"}
  }
}
```

## Start

In order to be able to receive data and submit transactions to the API server.

### Register

You need first to register to the contract through API server.

```BASH
# <ip> API ip address
curl -X POST -H "Content-Type: application/json" --data '{"username":"<username>","password":"<password>","email":"<e@mail.com>","address":"<0xmyetherwalletaddress>"}' http://<ip>:3000/api/v1/users/

# {"result":{"status":true,"tx":"<0xtransactionhash>","description":"Successfully submitted message bound to <queuekey>"},"timestamp":"<year-month-dateThour:minute:seconds.millisecondZ>"}
```

### Run

Once you successfully registred, install dependencies then run the oracle

```BASH
npm i --save
npm start

# {"message":"{\"pairs\":[{\"USDEUR\":{\"rate\":\"0.842601\",\"timestamp\":\"1596682985\"}},{\"USDTND\":{\"rate\":\"2.723994\",\"timestamp\":\"1596682985\"}},{\"USDCHF\":{\"rate\":\"0.908603\",\"timestamp\":\"1596682985\"}},{\"USDJPY\":{\"rate\":\"105.517026\",\"timestamp\":\"1596682985\"}}]}","level":"info","date":"2020-08-07T04:34:37.150Z"}
# {"message":"{\"result\":{\"status\":true,\"tx\":\"0x699a1d9a0be0bce19419c1a5121db27e78e49c6a478f245703a564b63d298c8a\",\"description\":\"Successfully submitted message bound to ckdjqir6j0000985nbmpb6w72\"},\"timestamp\":\"2020-08-07T04:34:50.309Z\",\"_id\":\"GX8KWMZOgGmMGeLt\"}","level":"info","date":"2020-08-07T04:34:37.150Z"}
# {"SUCCESS":"0x699a1d9a0be0bce19419c1a5121db27e78e49c6a478f245703a564b63d298c8a"}
# {"message":"{\"result\":{\"status\":true,\"tx\":\"0x06323e51875de8f9fc9616612a9232fcb1e43f3fb6278c3b71bf0a952fab1148\",\"description\":\"Successfully submitted message bound to ckdjqir6j0000985nbmpb6w72\"},\"timestamp\":\"2020-08-07T04:34:50.311Z\",\"_id\":\"00fiTYQVTQJ0Lcnj\"}","level":"info","date":"2020-08-07T04:34:37.150Z"}
# {"SUCCESS":"0x06323e51875de8f9fc9616612a9232fcb1e43f3fb6278c3b71bf0a952fab1148"}
# {"message":"{\"result\":{\"status\":true,\"tx\":\"0xf2db82d8954505932cbec1eacb687e204edc3896a3a58f391881dc3ec10d6653\",\"description\":\"Successfully submitted message bound to ckdjqir6j0000985nbmpb6w72\"},\"timestamp\":\"2020-08-07T04:34:50.312Z\",\"_id\":\"8iMqFrHHV4zI7lQe\"}","level":"info","date":"2020-08-07T04:34:37.150Z"}
# {"SUCCESS":"0xf2db82d8954505932cbec1eacb687e204edc3896a3a58f391881dc3ec10d6653"}
# {"message":"{\"result\":{\"status\":true,\"tx\":\"0x6925785726b26b4ad98a0e6d43ddea510a5dc11c53b209031f06184e00791c05\",\"description\":\"Successfully submitted message bound to ckdjqir6j0000985nbmpb6w72\"},\"timestamp\":\"2020-08-07T04:34:50.313Z\",\"_id\":\"SK7BhIw02VvieJyN\"}","level":"info","date":"2020-08-07T04:34:37.150Z"}
# {"SUCCESS":"0x6925785726b26b4ad98a0e6d43ddea510a5dc11c53b209031f06184e00791c05"}
```

### Jenkins

You can alternatively setup a jenkins job and make use of the ```Jenkinsfile``` to automate the integration and deployment of the application.
**NOTE:** You have to import configuration files above into the server before you trigger the pipeline.