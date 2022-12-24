async function requestGif(tag_s) {
    const response = await (await fetch('https://api.giphy.com/v1/gifs/random?' + new URLSearchParams({
        api_key: process.env.GIPHY_API_KEY,
        tag: tag_s,
    }))).json()

    return {
        url: response.data.url,
        gif: 'https://media.giphy.com/media/' + response.data.id + '/giphy.gif'
    };
}

module.exports = { requestGif };

// ******************************************
// Using Giphy API
// Accessible from https://developers.giphy.com/dashboard/?
// ******************************************