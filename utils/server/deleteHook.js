const fs = require('fs');
const keyConstants = require("../../constants/keys")

const deleteServerHook = async (server, options) => {
    const alias = server.alias
    const currPaths = {
        tpub:  `${keyConstants.TEMP_PUBLIC_KEYS_PATH}/${alias}`,
        tpriv: `${keyConstants.TEMP_PRIVATE_KEYS_PATH}/${alias}`,
        pub:  `${keyConstants.PUBLIC_KEYS_PATH}/${alias}`,
        priv: `${keyConstants.PRIVATE_KEYS_PATH}/${alias}`
    }

    for (const key of Object.keys(currPaths)) {
        const folderPath = currPaths[key];

        try {
            fs.rmdirSync(folderPath, { recursive: true });
        } catch (err) {
            console.error(`Error removing ${folderPath}: ${err.message}`);
        }
    }
}


module.exports = deleteServerHook
