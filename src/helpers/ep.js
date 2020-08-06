const http = require('http');
const querystring = require('querystring');


class EndPoint {

    constructor(_host, _port) {

        this.options = {
            host: _host,
            port: _port,
            headers: {
                'Content-Type': 'application/json'
              }
        };
    }

    get(_path, _parameters) {

        this.options.method = 'GET';
        
        let parameters = querystring.stringify({
            pairs: JSON.parse(_parameters).toString()
        });

        this.options.path = _path.concat(parameters);

        return new Promise((resolve, reject) => {

            const request = http.request(this.options, (response) => {

                let message = '';
    
                response.on("data", (data) => {
                    message += data;
                })
    
                response.on("end", () => {
                    resolve(message);
                })
            })
    
            request.on('error', (error) => {
                reject(error.message);
            })
    
            request.end();
        })
    }

    post(_path, _body) {

        this.options.method = 'POST';
        let body = JSON.stringify(_body);
        this.options.headers["Content-Length"] = Buffer.byteLength(body);
        this.options.headers["Authorization"] = 'Basic ' + Buffer.from(process.env.LOGIN + ':' + process.env.PASSWORD).toString('base64');
        this.options.path = _path;

        return new Promise((resolve, reject) => {

            const request = http.request(this.options, (response) => {

                let message = '';
    
                response.on("data", (data) => {
                    message += data;
                })
    
                response.on("end", () => {
                    resolve(message);
                })
            })
    
            request.on('error', (error) => {
                reject(error.message);
            })
    
            request.write(body);
    
            request.end();
        })
    }
}

module.exports = EndPoint;