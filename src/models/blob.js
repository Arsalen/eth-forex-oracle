class Blob {

    constructor(props) {
        
        this.data = props.data;
        this.to = props.to;
        this.chainId = props.chainId;
        this.gas = props.gas;
        this.nonce = props.nonce;
    }
}

module.exports = Blob;