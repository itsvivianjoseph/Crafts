const crypto = require("crypto");
const counter = require('./counter.js');

function generateShortUrl(longUrl) {
    const combinedUrl = `${longUrl}${global.counter}`;
    counter.increment();
    const sha256Hash = generateHash(combinedUrl);
    return sha256Hash.slice(0, 7);
}

function generateHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = generateShortUrl;