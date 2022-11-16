const axios = require('axios');

const animixBase = "https://animixplay.to/"

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };
/**
 * 
 * @param {number} [type=1] 
 * @returns {Array<string}
 */
async function getPopular(type = 1) {
    try {
        var list = []
        if (type == 1) {
            const res = await axios.get(animixBase + 'assets/s/popular.json', headerOption);

            res.data.result.map((anime) => {
                list.push({
                    animeTitle: anime.title,
                    mal_id: anime.url.split("/").reverse()[0],
                    animeImg: anime.picture,
                    views: anime.infotext.split(" ")[3],
                    score: anime.score / 100
                })
            })
        } else if (type == 2) {
            const res = await axios(animixBase + 'api/search', {
                method: "POST",
                headers: {
                    "User-Agent": USER_AGENT,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: new URLSearchParams({ genre: "any", minstr: 99999999, orderby: "popular" })
            })

            res.data.result.map((anime) => {
                list.push({
                    animeTitle: anime.title,
                    animeId: anime.url.split("/").reverse()[0],
                    animeImg: anime.picture,
                    format: anime.infotext,
                    score: anime.score / 100
                })
            })
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

exports.func = function(type) {
    return getPopular(type);
}

