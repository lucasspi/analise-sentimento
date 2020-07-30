import { getApi } from '../environments/config'
const twitter = getApi('twitter');

let controller = {

    async analyzeSentiment(req, res) {
        // INFORMAÇÕES DE SETUP PROVIDAS DA PAGINA DE API DO GOOGLE CLOUD LANGUAGE
        const projectId = '***********'
        const keyFilename = './google-credentials.json'
        const language = require('@google-cloud/language');

        // Instantiates a client
        const client = new language.LanguageServiceClient({projectId, keyFilename});

        const document = {
            content: req.body.text, //TEXTO QUE VEEM NO CORPO DA REQUISIÇÃO
            type: 'PLAIN_TEXT',
        };

        // Detects the sentiment of the text
        const [result] = await client.analyzeSentiment({document: document});
        const sentiment = result.documentSentiment;

        res.json({ score: sentiment.score, magnitude: sentiment.magnitude })
    },

    async twitter(req, res) {
        // INFORMAÇÕES DE SETUP PROVIDAS DA PAGINA `https://www.npmjs.com/package/twitter`
        const client = new Twitter({
            consumer_key: twitterconsumer_key,
            consumer_secret: twitter.consumer_secret,
            bearer_token: twitter.bearer_token
        });
            
        const params = {screen_name: req.params.nameScreen}; // req.params.nameScreen proveniente dos paramentros passados na api
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log(tweets);
                res.json({error: false, tweets})
            }else{
                res.json({error: true, message: "Nenhum tweet encontrado"})
            }
        });
    },
}

module.exports = controller;