module.exports = class AppContract {

    constructor(provider, descriptor) {

        this.provider = provider;
        this.descriptor = descriptor;

        this.instance = new provider.web3.eth.Contract(descriptor.abi, descriptor.address);
    }

    set(pair) {

        let key = Object.keys(pair)[0];
        let value = Object.values(pair)[0];

        const callData = this.instance.methods.set(key, value).encodeABI();
        const address = this.instance.options.address;
        const network = this.descriptor.network;
        const gasLimit = this.descriptor.gasLimit;

        let message = {
            to: address,
            data: callData,
            chainId: network,
            gas: gasLimit,
        }

        return new Promise((resolve, reject) => {

            this.provider.sign(message)
                .then(onfulfilled => {

                    resolve(onfulfilled);
                })
                .catch(onrejected => {

                    reject(onrejected);
                })
        })
    }
}