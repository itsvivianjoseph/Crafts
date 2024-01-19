const crypto = require("crypto");
const counter = require('./counter.js');

function generateShortUrl(longUrl) {
    const combinedUrl = `${longUrl}${counter.current()}`;
    counter.increment();
    const sha256Hash = generateHash(combinedUrl);
    const newUrl = `http://localhost:3000/${sha256Hash.slice(0, 7)}`;
    return newUrl;
}

function generateHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = generateShortUrl;
