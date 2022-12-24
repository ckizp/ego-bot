async function generateImage(prompt) {
    const { Configuration, OpenAIApi } = require('openai');

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512'
        });
        const imageUrl = response.data.data[0].url;
        return imageUrl;
    } catch(error) {
        return 'The image could not be generated !';
    }
}

module.exports = { generateImage };