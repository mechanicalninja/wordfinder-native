#!/usr/bin/env node
/* eslint-disable global-require */
/* eslint-env node */

const fs = require('fs');
const zlib = require('zlib');
const Readable = require('stream').Readable;
const msgpack = require('msgpack-lite');

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

for (let wordLength = 10; wordLength < 20; wordLength += 1) {
  // eslint-disable-next-line no-console
  console.log(`Generating up-to-${wordLength}`);
  // eslint-disable-next-line import/no-dynamic-require
  const words = require(`deconstructed-word-list/dist/up-to-${wordLength}`);

  const json = JSON.stringify(words);

  const jsonDataStream = new Readable();
  // eslint-disable-next-line no-underscore-dangle
  jsonDataStream._read = function noop() {}; // redundant? see update below
  jsonDataStream.push(json);
  jsonDataStream.push(null);
  const jsonZipStream = zlib.createGzip();
  const jsonWriteStream = fs.createWriteStream(`data/up-to-${wordLength}.json`);
  jsonDataStream
    .pipe(jsonZipStream)
    .pipe(jsonWriteStream);

  fs.writeFileSync(`data/up-to-${wordLength}.json`, json);

  // Open the necessary streams.
  const encodeStream = msgpack.createEncodeStream();
  const mspZipStream = zlib.createGzip();
  const mspWriteStream = fs.createWriteStream(`data/up-to-${wordLength}.msp`);

  encodeStream
    .pipe(mspZipStream)
    .pipe(mspWriteStream);

  encodeStream.write(words);
  encodeStream.end();
}
