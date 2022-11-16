const axios = require("axios");
const { load } = require('cheerio');

const zoroBase = "https://zoro.to";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { "User-Agent": USER_AGENT, "X-Requested-With": "XMLHttpRequest" };

const { scrapeSource } = require('../helper/rapid-cloud.js');
/**
 * 
 * @param {string} episodeId 
 * @returns {Array<object}
 */
async function getEpisodeSourceFromZoro(episodeId) {
    try {
        if (!episodeId) return {
            error: true,
            error_message: "Episode ID not provided"
        };

        episodeId = episodeId.split("-").pop()

        const res = await axios.get(zoroBase + `/ajax/v2/episode/servers?episodeId=${episodeId}`, {
            headers: headerOption
        });
        const $ = load(res.data.html)

        let dataId;

        $('div.servers-sub > div.ps__-list > div.server-item').each((i, el) => {
            if ($(el).attr("data-server-id") == 1) {
                dataId = $(el).attr("data-id")
            };
        });

        const sources = await scrapeSource(dataId);


        return sources;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
}
exports.func = function(episodeId) {
    return getEpisodeSourceFromZoro(episodeId)
}