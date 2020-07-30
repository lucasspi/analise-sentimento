const envs = {
    twitter: {
        consumer_key: '3I94HsC312pczsOHJA44n4lWq',
        consumer_secret: 'QYhZwo0lLCYiwxIqsCz06bZ6QSKjaJAufCluTIMqqqcyDZKhaK',
        bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOiRGQEAAAAAcz7hMYLwXDV%2FdKXpoPP7HG%2FJKew%3DTBMPYnXyY9V7807lgw86TSHpzZj3aygi9GetcMi30oFZCaFoH5'
    },
    api: {
        //  url: 'http://localhost:3000/', //LOCAL
        url: "http://35.171.168.244:3000/", //API
    }
}

module.exports.getApi = (env) => {
    return envs[env];
}