# javascript notes

|||javascript reference |||mdn web docs |||es6 |||mozilla developer |||moz://a

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>

---

|||nvm

```bash
mkdir ~/.nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash
```

```bash
export NVM_DIR="/Users/[user]/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

---

|||grunt |||npm grunt |||npm install grunt
|||sass css |||css |||grunt sass

`npm install -g grunt`

`### The –g option means – install this dependency globally for the current version of node in use.`

`grunt sass`

---

|||bower |||npm install bower |||npm bower

`npm install -g bower`

---

|||nvm automatically read .nvmrc files when you change directory |||.nvmrc |||nvmrc

```bash
### Add the below to your ~/.bash_profile

### NVM for NPM
export NVM_DIR="/Users/[EXAMPLE-USER]/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
### NVM
### automatically read .nvmrc files when you change directory
###    see https://github.com/creationix/nvm/issues/110#issuecomment-180570373
read_nvm() {
    if [ "$PWD" != "$PREV_PWD" ]; then
        PREV_PWD="$PWD";
        if [ -e ".nvmrc" ]; then
            nvm use;
        fi
    fi
}
export PROMPT_COMMAND=read_nvm
```

---

|||javascript synchronous vs asynchronous |||javascript synchronous vs. asynchronous
|||synchronous asynchronous |||synchronous vs asynchronous |||synchronous vs. asynchronous

<https://stackoverflow.com/questions/16336367/what-is-the-difference-between-synchronous-and-asynchronous-programming-in-node>

```text
The difference is that in the first example, the program will block in the first line. The next line (console.log) will have to wait.

In the second example, the console.log will be executed WHILE the query is being processed. That is, the query will be processed in the background, while your program is doing other things, and once the query data is ready, you will do whatever you want with it.

So, in a nutshell: The first example will block, while the second won't.

The output of the following two examples:

// Example 1 - Synchronous (blocks)

var result = database.query("SELECT * FROM hugetable");
console.log("Query finished");
console.log("Next line");


// Example 2 - Asynchronous (doesn't block)

database.query("SELECT * FROM hugetable", function(result) {
    console.log("Query finished");
});
console.log("Next line");
Would be:

Query finished
Next line
Next line
Query finished

Note
While Node itself is single threaded, there are some task that can run in parallel. For example, File System operations occur in a different process.

That's why Node can do async operations: one thread is doing file system operations, while the main Node thread keeps executing your javascript code. In an event-driven server like Node, the file system thread notifies the main Node thread of certain events such as completion, failure, or progress, along with any data associated with that event (such as the result of a database query or an error message) and the main Node thread decides what to do with that data.

You can read more about this here: How the single threaded non blocking IO model works in Node.js
https://stackoverflow.com/questions/14795145/how-the-single-threaded-non-blocking-io-model-works-in-node-js/14797359#14797359
```

---

<https://stackoverflow.com/questions/2035645/when-is-javascript-synchronous>

---
<https://stackoverflow.com/questions/21819858/how-to-wrap-async-function-calls-into-a-sync-function-in-node-js-or-javascript>

<https://stackoverflow.com/questions/44628487/synchronous-function-call-in-node-js>

<https://www.npmjs.com/package/sync>

---

|||javascript promises |||javascript promise

<https://www.promisejs.org/>

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>

<https://stackoverflow.com/questions/41412512/node-js-promise-request-return>

<https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/>

---

|||es6-promise-pool |||javascript es6-promise-pool |||javascript promise-pool |||promise-pool
|||javascript concurrent requests |||javascript concurrent http requests |||javascript concurrency

<https://www.npmjs.com/package/es6-promise-pool>
<https://github.com/timdp/es6-promise-pool>

```javascript
const isEqual = require('lodash.isequal');
const csv = require('csv');
const path = require('path');
const fs = require('fs');
const rp = require('request-promise');
const PromisePool = require('es6-promise-pool');

const exampleJavaScriptMap = {};

// Reading parameters from command line
if (process.argv.length <= 2) {
    console.log("Script use: " + __filename + " EXAMPLE_CSV_FILE_NAME.csv");
    process.exit(-1);
}

const examplehttpHeaders = {
    'Content-Type': 'application/json'
};

function exampleBuildQueryParameter(newParameterValue) {
    return {exampleParamater: newParameterValue};
}

function exampleBuildRequestOptions(urlQueryParametersObject) {
  var exampleOptions = {
    url: 'https://example.api.com/examplepath',
    method: 'GET',
    qs: urlQueryParametersObject,
    pfx: fs.readFileSync('/etc/pki/exampleCertificate.p12'),
    passphrase: 'examplePassphrasePassword',
    strictSSL: false,
    timeout: 30000,
    headers: examplehttpHeaders
  };
    return exampleOptions;
}

/*
Example data structure output:
[
    ['header1', 'header2', 'header3', 'header4']
    ['Abc', ..., ..., ...],
    ['Abc', ..., ..., ...],
    ['Abc', ..., ..., ...],
    ['Abc', ..., ..., ...]
]
*/
function exampleReadRowsAndCells(exampleFilepath = './') {
    var exampleCSVFileNameFromConsoleInput = process.argv[2];
    var exampleCSVFilePath = exampleFilepath + exampleCSVFileNameFromConsoleInput;
    const exampleCSVData = fs.readFileSync(path.resolve(__dirname, '.', exampleCSVFilePath));
    // parse the csv file row by row and for each row parse the contents of it's cells
    return parseFile(exampleCSVData).then(rows => rows.map(exampleExtractCellsFromRow));
}

function exampleExtractCellsFromRow(row) {
  return {
    cell1: row[0],
    cell2: row[1],
    cell3: row[2],
    cell4: row[3]
  };
}

const exampleCSVFileHeaders = ['exampleNameOfHeader1', 'exampleNameOfHeader2', 'exampleNameOfHeader3', 'exampleNameOfHeader4'];

function exampleParseCSVFile(file) {
  return new Promise((resolve, reject) => {
    csv.parse(file, (err, data) => {
      if (err) {
        reject(new Error('CSV parsing failure: ' + err.toString()));
      } else {
        const csvParsedHeaders = data[0];
        if (!isEqual(csvParsedHeaders, exampleCSVFileHeaders)) {
          reject(new Error('Invalid csv header.'));
        }
        // remove headers row from csv file
        const dataWithoutHeader = data.slice(1);
        resolve(dataWithoutHeader);
      }
    });
  });
}

function exampleGoThroughCSVDataAndMakeHTTPCallsForEachOne() {
    return exampleReadRowsAndCells().then(resultObj => {
        let i = 0;

        // promiseProducer needs to give back promises one by one
        const promiseProducer = function () {
            if(i < resultObj.length) {
                process.stdout.write(',');
                let row = resultObj[i];
                i++;
                const exampleNewURL = row.cell3;
                const exampleNewURLQueryParameter = buildQueryParameter(exampleNewURL);
                const exampleRequestOptions = buildRequestOptions(exampleNewURLQueryParameter);

                return rp(exampleRequestOptions).then(req => {
                 // build a javascript map where the url is the key and the http response is the value
                    exampleJavaScriptMap[row.cell3] = req;
                });
            } else {
            // null tells the PromisePool when we have finished
             return null;
            }
        }

        // The concurrency value sets out how many promises should be executed in parallel.
        const concurrency = 100;

        const pool = new PromisePool(promiseProducer, concurrency);

        const poolPromise = pool.start();

        return poolPromise;

    }).catch(function(err){
        console.log(err);
    })
}

function exampleRunJavaScriptNodeJSScript() {
    exampleGoThroughCSVDataAndMakeHTTPCallsForEachOne().then(result => {
        console.log(exampleJavaScriptMap);
    });
}

exampleRunJavaScriptNodeJSScript();
```

---

|||javascript unit tests |||javascript csv unit tests |||example javascript unit tests

`/test/unit/example-spec.helper.js`

```javascript
const sinon = require('sinon');
const sandbox = sinon.sandbox.create();
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
const proxyquire = require('proxyquire');
const fromPairs = require('lodash.frompairs');

chai.use(sinonChai);
chai.use(chaiAsPromised);


function createDouble(methods) {
  return fromPairs(methods.map(m => [m, () => {}]));
}

global.createDouble = createDouble;
global.sandbox = sandbox;
global.sinon = sinon;
global.expect = chai.expect;
global.proxyquire = proxyquire;
```

`/test/unit/csvParser.spec.js`

```javascript
const EXAMPLE_VALID_CSV = [
  'header1,header2,header3,header4,header5,header6',
  'A,1234567,http://www.example.com/98fcffa7id,A,1234567,a',
  'B,1234567,http://www.example.com/98fcffa7id,B,1234567,b',
  'C,1234567,http://www.example.com/98fcffa7id,C,1234567,c',
].join('\r');

const EXAMPLE_VALID_CSV_PARSED = [
  { header1:'A', header2: '1234567', header3: 'http://www.example.com/98fcffa7id,A,1234567,a'},
  { header1:'B', header2: '1234567', header3: 'http://www.example.com/98fcffa7id,B,1234567,b'},
  { header1:'C', header2: '1234567', header3: 'http://www.example.com/98fcffa7id,C,1234567,c'}
];

const EXAMPLE_CSV_MISSING_HEADER = [
  'A,1234567,http://www.example.com/98fcffa7id,A,1234567,a',
  'B,1234567,http://www.example.com/98fcffa7id,B,1234567,b',
  'C,1234567,http://www.example.com/98fcffa7id,C,1234567,c',
].join('\r');

const EXAMPLE_CSV_MALFORMED_ROW = [
  'A,1234567,http://www.example.com/98fcffa7id,A,1234567,a',
  'B,1234567',
  'C,1234567,http://www.example.com/98fcffa7id,C,1234567,c',
].join('\r');

function inject({ file = '', csvParseFail = false }) {
  const mocks = {
    'fs': { 'readFileSync': () => file },
  };
  if (csvParseFail) {
    mocks.csv = { parse: (file, cb) => {
      cb(new Error(), 'Parse failure');
    }};
  }
  return proxyquire('../../src/index', mocks);
}

describe('reading the csv file', () => {

  it('should parse the csv file and return all rows', () => {
    const csvReader = inject({ file: EXAMPLE_VALID_CSV });
    return expect(csvReader.readPlaces()).to.eventually.deep.equal(EXAMPLE_VALID_CSV_PARSED);
  });

  it('should return a rejected promise when parsing csv file which is malformed', () => {
    const csvReader = inject({ csvParseFail: true });
    return expect(csvReader.readPlaces()).to.be.rejectedWith(/parse/);
  });

  it('should return a rejected promise when parsing a csv file with a missing header', () => {
    const csvReader = inject({ file: EXAMPLE_CSV_MISSING_HEADER });
    return expect(csvReader.readPlaces()).to.be.rejectedWith(/header/);
  });

  it('should return a rejected promise when parsing a csv file which has a malformed row', () => {
    const csvReader = inject({ file: EXAMPLE_CSV_MALFORMED_ROW });
    return expect(csvReader.readPlaces()).to.be.rejected;
  });
});
```

---

|||example javascript package.json for unit tests
|||javascript unit tests |||javascript csv unit tests |||example javascript unit tests
|||javascript cucumber tests |||javascript cucumber feature |||javascript feature

```json
{
  "name": "example-name",
  "version": "1.0.0",
  "description": "example description",
  "main": "index.js",
  "scripts": {
    "test": "npm run lint && mocha 'test/unit/**/*.spec.js' -r test/unit/spec.helper.js",
    "acceptance": "cucumber-js test/acceptance/add.topic.feature --require test/acceptance/support.js",
    "lint": "eslint src/ test/ --fix"
  },
  "author": "",
  "dependencies": {
    "chai": "^4.1.2",
    "chai-as-promised": "^7.1.1",
    "csv": "^1.1.1",
    "cucumber": "^3.0.4",
    "es6-promise-pool": "^2.5.0",
    "eslint": "^4.8.0",
    "lodash": "^4.17.4",
    "lodash.frompairs": "^4.0.1",
    "lodash.isequal": "^4.5.0",
    "mocha": "^4.0.1",
    "path": "^0.12.7",
    "promise": "^8.0.1",
    "proxyquire": "^1.8.0",
    "request": "^2.83.0",
    "request-promise": "^4.2.2",
    "sinon": "^4.0.1",
    "sinon-chai": "^2.14.0"
  }
}
```

---

|||README.md |||readme example

```markdown
## Requirements

- [Node.js](https://nodejs.org) version 6+

## Usage

To **run the script**:
\```bash
node index.js example.csv
\```
## Dev

To run the **unit tests**:
\```bash
npm run test
\```

To run the **acceptance tests**:
\```bash
npm run acceptance
\```
```

---

|||javascript cucumber tests |||cucumber

```javascript
//cucumber.support.js

const { defineSupportCode } = require('cucumber');
const expect = chai.expect;
const chai = require('chai');

defineSupportCode(function({ Given, Then, When }) {
  Given(/^example given$/, function () {
    return null;
  });


  When(/^example when condition$/, function () {
    return null;
  });



  Then(/^example something happens/, function() {
  });
});
```

---

|||javascript cucumber tests |||javascript cucumber feature |||javascript feature

```javascript
@Feature:
Feature:
  Example feature description.


@Background:
  Given I start on a clean slate / piece of paper / reset the World



Scenario: Example scenario description
  Given Example given step
  When Example when step
  Then Example then
```

---

|||javascript child process |||javascript command line |||child process

<https://stackoverflow.com/questions/21880068/cucumber-js-child-process-in-feature-step>

I believe the issue is due to a couple things:

The callback is invoked in the Given, essentially exiting the cucumberjs program prior to finishing the child process execution.
The exit delegate passed into exec() is being overridden when assigning an 'on' event handler.
I believe this will solve your issue:

```javascript
var ChildProcess = require('child_process');

function execCmd(cb) {

  console.log('Testing command...');
  var bin = ChildProcess.exec('ls -l', {timeout:5}, function(error, stdout, stderr) {
    console.log('executing...');
    console.log(error);
    console.log(stdout);
    console.log(stderr);
    cb();
  });
}

module.exports = function() {

  this.Given(/^I am on the command line$/, function(callback) {
    execCmd(callback);
  });

}
```

shareeditflag
answered Feb 20 '14 at 15:22

Todd Anderson
463

---

|||.eslintrc |||eslintrc

example eslintrc file:

`.eslintrc.json`

```json
{
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "expect": true,
    "proxyquire": true,
    "sandbox": true,
    "sinon": true,
    "createDouble": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "argsIgnorePattern": "^_"
    }],
    "no-console": "off"
  }
}
```

---
