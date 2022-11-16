const axios = require('axios');


const animixBase = "https://animixplay.to/"

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };

/**
 * 
 * @param {string} malId 
 * @returns {Array<object}
 */
async function getAnimeInfoFromAnimix(malId) {
    try {
        if (!malId) return {
            error: "No ID provided"
        };
        var list = {}
        const fetchInfo = await axios.get(animixBase + `assets/mal/${malId}.json`, headerOption);
        const fetchInfoLinks = await axios.get(animixBase + `assets/rec/${malId}.json`, headerOption)
            .catch(err => { });

        list = {
            animeTitle: fetchInfo.data.title,
            animeId: fetchInfoLinks?.data["Gogoanime"] ? fetchInfoLinks?.data["Gogoanime"][0].url.split('/').reverse()[0] : "",
            mal_id: fetchInfo.data.mal_id,
            animeImg: fetchInfo.data.image_url,
            episodes: fetchInfo.data.episodes,
            status: fetchInfo.data.status,
            score: fetchInfo.data.score,
            synopsis: fetchInfo.data.synopsis,
            genres: fetchInfo.data.genres.map((genr) => genr.name),
            studios: fetchInfo.data.studios.map((st) => st.name),
            gogoAnimeLink: fetchInfoLinks?.data["Gogoanime"],
            animepaheLink: fetchInfoLinks?.data["animepahe"],
            zoroLink: fetchInfoLinks?.data["Zoro"]
        }

        return list;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};
exports.func = function(malId) {
    return getAnimeInfoFromAnimix(malId);
}