const envs = {
    twitter: {
        consumer_key: '********************',
        consumer_secret: '**************************************',
        bearer_token: '*****************************************************************************'
    },
    api: {
        //  url: 'http://localhost:3000/', //LOCAL
        url: "http://35.171.168.244:3000/", //API
    }
}

module.exports.getApi = (env) => {
    return envs[env];
}