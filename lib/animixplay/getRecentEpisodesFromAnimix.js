const axios = require('axios');
const { load } = require('cheerio');
const { XMLParser } = require('fast-xml-parser');

const animixBase = "https://animixplay.to/"

/**
 * 
 * @returns {Array<string}
 */
async function getRecentEpisodesFromAnimix() {
    try {
        const res = await axios.get(animixBase + 'rsssub.xml');
        const parser = new XMLParser();
        const jsonResults = parser.parse(res.data).rss.channel.item;
        var list = [];
        jsonResults.map((anime) => {
            const $ = load(anime.description);
            list.push({
                episodeTitle: anime.title.split(" ").slice(0, -2).join(" "),
                animeId: anime.link.split("/")[4],
                releaseTimeUnix: Date.parse(anime.pubDate) / 1000,
                mal_id: anime.idmal,
                episodeNum: anime.ep.split("/")[0],
                episodes: anime.ep,
                animeImg: $("img").attr("src")
            })
        });

        return list;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        };
    }
};
exports.func = function() {
    return getRecentEpisodesFromAnimix();
}