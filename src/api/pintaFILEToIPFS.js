var axios = require('axios');
var FormData = require('form-data');

export const pintaFILEToIPFS = async(pinataApiKey, pinataSecretApiKey, streamFile) => {

    var data = new FormData();
    data.append('pinataOptions ', '');
    data.append('file', streamFile);

    var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey,
            // ...data.getHeaders()
        },
        data: data
    };

    return await axios(config)
        .then(function(response) {
            return response
        })
        .catch(function(error) {
            console.log(error);
        });
}