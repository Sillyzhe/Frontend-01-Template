const net = require('net');
// net.connect({
//     address: 'localhost',
//     port: 8088,
//     onread: {
//         // 为套接字的每次读取复用 4KiB 的 Buffer。
//         buffer: Buffer.alloc(4 * 1024),
//         callback: function (nread, buf) {
//             // 收到的数据在 `buf` 中可用，从 0 到 'nread`。
//             console.log(buf.toString('utf8', 0, nread));
//         }
//     }
// });


/*
const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088
}, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');

   
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

*/
class Request {
  // method,url=host+poar+path
  //hody:k/v 
  //headers
  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key=>`${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}
\r
`
  }
  send(connection) {
    const parser = new ResponseParser()
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port,
        }, () => {
          connection.write(this.toString())

        })
      }
      connection.on('data', (data) => {
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.getResponse)
        }
        // console.log(parser.statusLine)
        // console.log(parser.headers)
        // console.log(parser.current)
        // resolve(data.toString())
        connection.end()
      })
      connection.on('err', (err) => {
        reject(err.toString())
        connection.end()
      })
    })

  }
}

class Resopnse {

}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_LINE_BLOCK_END = 6;
    this.WAITING_BODY = 7;
    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get getResponse() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += (char)
      }

    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_BLOCK_END;
        if (this.headers["Transfer-Encoding"] === "chunked") {
          this.bodyParser = new TrunkedBodyParser()
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_BLOCK_END) {
      if (char === "\n") {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }

}

// 111分钟
class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TURNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WAITING_LENGTH;
  }
  receiveChar(char) {
    // console.log(JSON.stringify(char))
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length == 0) {
          this.isFinished = true
        } else {
          this.current = this.WAITING_LENGTH_LINE_END;
        }
      } else {
        this.length *= 10;
        this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === "\n") {
        this.current = this.READING_TURNK

      }
    } else if (this.current === this.READING_TURNK) {
      this.content.push(char);
      this.length--;
      if (this.length == 0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}
void async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: "/",
    headers: {
      "X-Foo2": "customed",
    },
    body: {
      name: "winter"
    }
  })
  let response = await request.send();
  console.log('response', response)
}();