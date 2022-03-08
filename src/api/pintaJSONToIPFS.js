const axios = require('axios');


export const pintaJSONToIPFS = async(pinataApiKey, pinataSecretApiKey, JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    // console.log(pinataApiKey)
    // console.log(pinataSecretApiKey)
    return await axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function(response) {
            // console.log(response)
            return response
        })
        .catch(function(error) {
            console.log(error)
        });
};