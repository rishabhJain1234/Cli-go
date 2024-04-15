const mkdirp = require('mkdirp');
const constants = require("./../../constants/keys")

const createServerHook = async (server, options) => {
    const keys = {
        temp : {
            pub: `${constants.TEMP_PUBLIC_KEYS_PATH}/${server.alias}`,
            priv: `${constants.TEMP_PRIVATE_KEYS_PATH}/${server.alias}`
        },
        authorized: {
            pub: `${constants.PUBLIC_KEYS_PATH}/${server.alias}`,
            priv: `${constants.PRIVATE_KEYS_PATH}/${server.alias}`
        }
    }
    await mkdirp(keys.temp.pub);
    await mkdirp(keys.temp.priv);
    await mkdirp(keys.authorized.pub);
    await mkdirp(keys.authorized.priv);

    server.authorizedKeysPath = keys.authorized.pub;
}

module.exports = createServerHook
