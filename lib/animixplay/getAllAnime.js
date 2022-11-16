const axios = require('axios');

const animixAll = "https://animixplay.to/assets/s/all.json";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };
/**
 * 
 * @returns {Array<object}
 */
async function getAllAnime() {
    try {
        const fetchAnimixAll = await axios.get(animixAll, headerOption);
        fetchAnimixAll.data.map(anime => {
            list.push({
                animeTitle: anime.title,
                animeId: anime.id
            })
        });
        var list = []
        return list;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
}
exports.func = function() {
    return getAllAnime();
}