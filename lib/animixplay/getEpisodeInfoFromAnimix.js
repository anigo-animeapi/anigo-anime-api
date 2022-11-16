const axios = require('axios');
const { load } = require('cheerio');

const animixBase = "https://animixplay.to/"


const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };

/**
 * 
 * @param {string} animeId 
 * @returns {Array<object}
 */
async function getEpisodeInfoFromAnimix(animeId) {
    try {
        if (!animeId) {
            return {
                error: "No anime ID provided"
            }
        }
var list = {}
        const res = await axios.get(animixBase + `v1/${animeId}`, headerOption);
        let episodes = [];
        const $ = load(res.data);

        const epList = JSON.parse($("#epslistplace").text());

        for (var key in epList) {
            if (Number(key) + 1) {
                episodes.push({
                    epNum: Number(key) + 1,
                    link: epList[key]
                })
            };
        };

        list = {
            animeTitle: $('span.animetitle').text(),
            mal_id: ($('body > script').get()[0].children[0].data).match(/var malid = '(.*)';/)[1],
            genres: $('span#genredata').text(),
            status: $('span#status').text(),
            total_episodes: epList.eptotal,
            extraLinks: epList?.extra,
            episodes
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
exports.func = function(animeId) {
    return getEpisodeInfoFromAnimix(animeId)
}