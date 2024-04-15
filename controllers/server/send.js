// 1. Check existence of an authorized private key for the user and the server received.
// 2. Check if the public key is synchronized on the remote server. TODO
        // a. Just check if this server can ssh into the remote server using the decrypted private key. 
// 3. Decrypt and send the respective private key (send base64 encoded file).

const { PRIVATE_KEYS_PATH } = require("../../constants/keys");
const fs = require('fs');
const forge = require('node-forge');
const Server = require("../../database/postgres/models/server.model");

exports.sendUserPrivateKey = async (req, res) => {
    const alias = req.params.alias;
    
    const existingServer = await Server.findOne({ 
        where: { 
          alias
        } 
    });

    if (!existingServer) {
        return res.status(404).json(`Server with alias ${alias} does not exist`);
    }

    const privKeyPath = `${PRIVATE_KEYS_PATH}/${alias}/${res.locals.user.username}.pem`;

    if (!fs.existsSync(privKeyPath)) {
        return res.status(401).json(`You are not authorized to access ${alias}`);
    }

    const encryptedPrivateKey = fs.readFileSync(privKeyPath);

    const decryptedPrivateKey = forge.pki.privateKeyToPem(forge.pki.decryptRsaPrivateKey(encryptedPrivateKey, res.locals.password));
    
    res.status(200).json({"Private Key": Buffer.from(decryptedPrivateKey).toString('base64')});
}
