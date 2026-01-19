const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'files','lorem.txt'),{encoding: 'utf8'});

ws = fs.createWriteStream(path.join(__dirname, 'files', 'lorem.txt'))