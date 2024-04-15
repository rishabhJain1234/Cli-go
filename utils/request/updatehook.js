const fs = require('fs');
const keyConstants = require("../../constants/keys")
const modelConstants = require("../../constants/models")

const updateRequestHook = async (request, options) => {
    const username = options.username
    const alias = options.alias
    let pubDestinationPath, privDestinationPath, pubSourcePath, privSourcePath;

    const prevInstance = request._previousDataValues

    // temp key paths
    const tempPaths = {
        pub:  `${keyConstants.TEMP_PUBLIC_KEYS_PATH}/${alias}/${username}.pub`,
        priv: `${keyConstants.TEMP_PRIVATE_KEYS_PATH}/${alias}/${username}.pem`
    }

    // permanent key paths
    const activePaths = {
        pub:  `${keyConstants.PUBLIC_KEYS_PATH}/${alias}/${username}.pub`,
        priv: `${keyConstants.PRIVATE_KEYS_PATH}/${alias}/${username}.pem`
    }


    // Determine source path
    if(
        prevInstance.status === modelConstants.requestStatuses.PENDING || 
        prevInstance.status === modelConstants.requestStatuses.REJECTED
    ){
        pubSourcePath = tempPaths.pub
        privSourcePath = tempPaths.priv
    }
    else{
        pubSourcePath = activePaths.pub
        privSourcePath = activePaths.priv
    }

    // Determine destination path
    if (request.status === modelConstants.requestStatuses.APPROVED) {
        pubDestinationPath = activePaths.pub
        privDestinationPath = activePaths.priv
    }
    else {
        pubDestinationPath = tempPaths.pub
        privDestinationPath = tempPaths.priv
    }

    fs.renameSync(pubSourcePath, pubDestinationPath)
    fs.renameSync(privSourcePath, privDestinationPath)
}


module.exports = updateRequestHook
