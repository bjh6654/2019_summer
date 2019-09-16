const URL = require('./url.js');
const DNS = require('dns');
const NET = require('net');
const readline = require('readline');
const Event = require('events').EventEmitter;

const R = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36";

class Request extends Event {
    constructor(URL) {
        super();
        this.url = URL;
        this.method = "GET";
        this.header = `${this.method} / HTTP/1.1\nAccept: ${ACCEPT}\nHost: ${this.url.getHost()}\nUser-Agent: ${USER_AGENT}\nUpgrade-Insecure-Requests: 1\n`;
        this.once('header', function(data) {
            console.log(data.toString().match(/[^\<]*\</g)[0]);
        })
    }
    GetIP() {
        return new Promise((res) => {
            DNS.resolve4(this.url.getHost(), (err, addresses) => {
                if (err) throw err;
                res(addresses[0]);
            })
        })
    }
    connect(ip) {
        let client = NET.connect( { port : 80, host : ip }, () => {
            console.log('Client connected');
            client.write(this.header+'\n');
        });
        
        client.on('data', (data) => {
            console.log("--- HEADER ---");
            this.emit('header', data);
        });
        
        client.on('end', function() {
            console.log('Client disconnected');
        });
    }
    addHeader(key, value) {
        this.header += `${key}: ${value}\n`;
    }
    stringify() {

    }
    setPOST() {
        this.method = "POST";
    }
    setGET() {
        this.method = "GET";
    }
}

const url = new URL("http://zum.com");
const request = new Request(url);
request.GetIP().then( ip => request.connect(ip));


// R.question("URL : ", line => {
//     const url = new URL(line);
//     const request = new Request(url);
//     request.GetIP().then( ip => request.connect(ip));
//     R.close();
// })

