const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secret = 'shezhuansauce';
const key = crypto.createHash('sha256').update(String(secret)).digest('base64');
const key_in_bytes = Buffer.from(key, 'base64')
const iv = crypto.createHash('sha256').update("smslt",'utf-8').digest("hex").substring(0,16)

module.exports.encrypt= function(text) {
 let cipher = crypto.createCipheriv(algorithm, key_in_bytes, iv);
 let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
//  encrypted = Buffer.concat([encrypted, cipher.final()]);
 return   encrypted ;
}

module.exports.decrypt = function (text) {
 let buffer = Buffer.from(text, 'hex');
 let encryptedText=  buffer.toString('utf-8')
 let decipher = crypto.createDecipheriv(algorithm, key_in_bytes, iv);
 let decrypted = decipher.update(text, 'hex', 'utf-8') + decipher.final('utf-8');
 
 return decrypted.toString();
}