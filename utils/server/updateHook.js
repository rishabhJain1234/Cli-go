const fs = require('fs');
const keyConstants = require("../../constants/keys")

const updateServerHook = async (server, options) => {
    const prevInstance = server._previousDataValues

    if (prevInstance.alias === server.alias) return;

    const palias = prevInstance.alias
    const alias = server.alias

    // prev key paths
    const prevPaths = {
        tpub:  `${keyConstants.TEMP_PUBLIC_KEYS_PATH}/${palias}`,
        tpriv: `${keyConstants.TEMP_PRIVATE_KEYS_PATH}/${palias}`,
        pub:  `${keyConstants.PUBLIC_KEYS_PATH}/${palias}`,
        priv: `${keyConstants.PRIVATE_KEYS_PATH}/${palias}`
    }

    // current key paths
    const currPaths = {
        tpub:  `${keyConstants.TEMP_PUBLIC_KEYS_PATH}/${alias}`,
        tpriv: `${keyConstants.TEMP_PRIVATE_KEYS_PATH}/${alias}`,
        pub:  `${keyConstants.PUBLIC_KEYS_PATH}/${alias}`,
        priv: `${keyConstants.PRIVATE_KEYS_PATH}/${alias}`
    }


    for (const key of Object.keys(prevPaths)) {
        const fromPath = prevPaths[key];
        const toPath = currPaths[key];

        try {
            fs.renameSync(fromPath, toPath);
        } catch (err) {
            console.error(`Error renaming ${key}: ${err.message}`);
        }
    }
}


module.exports = updateServerHook
