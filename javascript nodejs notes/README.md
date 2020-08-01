# javascript nodejs notes

|||npm
|||javascript

```bash
npm install aws-sdk -save

npm install tape -save-dev

### javascript validator
npm install -g eslint
```

---

|||npm package.json
|||node package.json

```json
{
  "name": "example-project-name",
  "version": "1.0.0",
  "license": "",
  "scripts": {
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "style": "node_modules/.bin/node-sass public/css/main.scss public/css/main.css",
    "start": "node server.js",
    "build-and-start": "concurrent \"npm run tsc:w\" \"npm run style\" \"npm run start\" ",
    "test-from-local": "phantomjs --proxy=www-example.proxy.com:80 tests/smoke-test.js"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "dependencies": {
    "angular2": "2.0.0-beta.0",
    "aws-cloudfront-sign": "^2.1.2",
    "aws-sdk": "^2.2.32",
    "body-parser": "^1.15.0",
    "bunyan": "^1.6.0",
    "es6-promise": "^3.0.2",
    "es6-shim": "^0.33.3",
    "express": "^4.13.4",
    "http-proxy": "^1.12.1",
    "imager.js": "^0.5.0",
    "ip": "^1.1.0",
    "lodash": "^4.0.1",
    "moment": "^2.13.0",
    "reflect-metadata": "0.1.2",
    "rxjs": "5.0.0-beta.0",
    "socket.io": "^1.4.4",
    "socket.io-redis": "^1.0.0",
    "sqs-consumer": "^3.1.2",
    "systemjs": "0.19.24",
    "tunnel": "0.0.4",
    "zone.js": "0.5.10"
  },
  "devDependencies": {
    "concurrently": "^1.0.0",
    "minifier": "0.7.1",
    "node-sass": "^3.4.2",
    "speculate": "^1.2.1",
    "typescript": "^1.7.3"
  },
  "spec": {
    "requires": [
      "td-agent",
      "scl-utils"
    ],
    "executable": [
      "bake-scripts"
    ]
  }
}
```

---

|||javascript csv
|||nodejs csv

<https://github.com/mafintosh/csv-parser>

<http://csv.adaltas.com/parse/>

<https://gooroo.io/GoorooTHINK/Article/17328/How-to-read-and-parse-a-CSV-file-using-NodeJS/27993#.WdNqANOGNhE>

```javascript
const csv = require('csv-parser')
const fs = require('fs');

// var map1 = new Map();
// Use this '{}' map instead of 'new Map()', because of catch (Objects and maps compared: Do you need keys that aren't strings?) in docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

var map1 = {};

fs.createReadStream('example-test-dummy.csv')
  .pipe(csv())
  .on('data', function (data) {
    map1[data.exampleattrib] = {};
//    console.log('>>>: %s', data.exampleattrib);
//    console.log(map1);
    console.log('>>>' + JSON.stringify(map1));
  })
```

---

|||javascript http request |||javascript request
|||nodejs http request |||nodejs request

<https://www.npmjs.com/package/request>

```javascript
const headers = {
  'Content-Type': 'application/json'
};

const exampleUrlQueryParametersObject = {exampleQueryParam: 'example-query-param-value'}


const request = require('request').defaults({
  pfx: fs.readFileSync('/etc/pki/tls/private/exampleCertificate.p12'),
  passphrase: 'examplePassword',
  strictSSL: false,
  timeout: 30000,
  headers: headers
});


function callExampleApi() {
  var options = {
    url: 'https://example.api.int.com/',
    method: 'GET',
    qs: urlQueryParametersObject,
    body: ''
  };

  var response = request(options, function (error, response, body) {
    console.log('example statusCode:', response && response.statusCode);
  });
}

callExampleApi();
```

---

<https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/>

---

<https://caolan.github.io/async/>

---

|||javascript request promise |||javascript request-promise

<https://www.npmjs.com/package/request-promise>

---
