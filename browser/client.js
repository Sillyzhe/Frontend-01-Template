const net = require("net");

const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088
}, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    client.write('GET / HTTP/1.1\r\n')
    client.write('Host: 127.0.0.1\r\n')
    client.write('Content-Length: 11')
    client.write('\r\n')
    client.write('Content-Type: application/x-www-form-urlencoded\r\n')
    client.write('\r\n')
    client.write('name=winter')


});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('已从服务器断开');
});

client.on('error', (err) => {
    console.log(err)
    client.end()
})
class Request {
    // method,url+port+path

    // body:k/v

    // headers
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.body = options.body || {}
        this.headers = options.headers || {}
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        if(this.headers["Content-Type"])

    }

}

class Response {

}