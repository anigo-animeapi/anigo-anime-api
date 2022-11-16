const axios = require("axios");
const { load } = require('cheerio');

const zoroBase = "https://zoro.to";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { "User-Agent": USER_AGENT, "X-Requested-With": "XMLHttpRequest" };

const { scrapeSource } = require('../helper/rapid-cloud.js');
/**
 * 
 * @param {string} zoroId 
 * @returns {Array<object}
 */
async function getAnimeInfoFromZoro(zoroId) {
    try {
        if (!zoroId) return {
            error: true,
            error_message: "No animeId provided"
        };

        let list = {};
        let episodes = [];

        const res = await axios.get(zoroBase + `/watch/${zoroId}`);
        const $ = load(res.data);

        const animeTitle = $('div.anisc-detail > h2.film-name > a').text()
        const animeImg = $('div.anisc-poster > div.film-poster > img').attr("src")
        const synopsis = $('div.film-description > div.text').text().trim()
        const type = $('div.film-stats > span.item').last().prev().prev().text()
        let dubbed = false;

        Array.from($('div.film-stats span.item div.tick-dub')).map((el) => {
            if ($(el).text().toLowerCase().includes("dub")) dubbed = true
        });

        const idNum = zoroId.split("-").pop();

        const episodesRes = await axios.get(zoroBase + `/ajax/v2/episode/list/${idNum}`, {
            headers: {
                ...headerOption,
                "Referer": zoroBase + `watch/${zoroId}`
            }
        });
        const $$ = load(episodesRes.data.html)
        const totalEpisodes = $$('div.detail-infor-content > div.ss-list > a').length;

        $$('div.detail-infor-content > div.ss-list > a').each((i, el) => {
            episodes.push({
                epNum: $(el).attr("data-number"),
                episodeName: $(el).attr("title"),
                episodeId: $(el).attr("href").split("/").pop().replace("?ep=", "-episode-")
            })
        })

        list = {
            animeTitle,
            animeImg,
            synopsis,
            type,
            isDubbed: dubbed,
            totalEpisodes,
            episodes
        };

        return list;
    } catch (err) {
        // console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
}
exports.func = function(zoroId) {
    return getAnimeInfoFromZoro(zoroId)
}