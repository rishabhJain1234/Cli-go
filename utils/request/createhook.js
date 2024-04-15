const Key = require("../../database/postgres/models/key.model")
const constants = require("../../constants/keys")
const fs = require('fs');
const mkdirp = require('mkdirp');

const { generateKeyPairSync } = require('crypto');

const createKeys = async (request, options) => {
    const user = options.user
    const server = options.server
    const password = options.password

    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: password
        }
    });

    const keyPath = `${server.alias}/${user.username}`
    const privKeyPath = `${constants.TEMP_PRIVATE_KEYS_PATH}/${keyPath}.pem`
    const pubKeyPath = `${constants.TEMP_PUBLIC_KEYS_PATH}/${keyPath}.pub`

    fs.writeFileSync(pubKeyPath, publicKey);
    fs.writeFileSync(privKeyPath, privateKey);

};

module.exports = createKeys
