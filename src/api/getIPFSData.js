var axios = require('axios');

export const getIPFSData = async(url) => {
    var config = {
        method: 'get',
        url: url,
    };
    try {
        const response = axios(config)
        if (!response) return
        return response

    } catch (error) {
        return error
    }

}