const envs = {
    maps: {
        api: 'AIzaSyB0YH1mH4F_sro1dYmsxwGDhTngl3pnB6A'
    },
    twitter: {
        api: 'AIzaSyB0YH1mH4F_sro1dYmsxwGDhTngl3pnB6A'
    },
    api: {
         url: 'http://localhost:3000/', //LOCAL
        // url: "http://35.171.168.244:3000/", //API
    }
}

module.exports.getApi = (env) => {
    return envs[env];
}