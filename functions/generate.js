async function generateImage(description) {
    const { Configuration, OpenAIApi } = require('openai');

    const configuration = new Configuration({
        apiKey: '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',
    });

    const openai = new OpenAIApi(configuration);

    const prompt = description;

    const response = await openai.createImage({
        prompt,
        n: 1,
        size: '512x512',
    });

    const imageUrl = response.data.data[0].url;
    return imageUrl;
}

module.exports = { generateImage };