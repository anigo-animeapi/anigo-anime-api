const axios = require('axios');
const { load } = require('cheerio');

const gogoBase2 = "https://gogoanime.gg/";

const goloadStreaming = "https://goload.pro/streaming.php"

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };

// consting Gogoanime functions
const {
    decryptAjaxResponse,
    getAjaxParams
} = require('../helper/gogoanime.js');
/**
 * 
 * @param {string} episodeId 
 * @returns {Array<object}
 */
async function getGogoanimeEpisodeSource(episodeId) {
    try {
        let sources = [];
        let sources_bk = [];

        let gogoWatchLink;
        if (episodeId.includes('episode')) {
            const res = await axios.get(gogoBase2 + episodeId);
            const $ = load(res.data);

            const gogoWatch = $('#load_anime > div > div > iframe').attr('src');
            gogoWatchLink = new URL("https:" + gogoWatch);
        } else gogoWatchLink = new URL(`${goloadStreaming}?id=${episodeId}`);

        const gogoServerRes = await axios.get(gogoWatchLink.href, headerOption);
        const $$ = load(gogoServerRes.data);

        const params = await getAjaxParams($$, gogoWatchLink.searchParams.get('id'));

        const fetchRes = await axios.get(`${gogoWatchLink.protocol}//${gogoWatchLink.hostname}/encrypt-ajax.php?${params}`, {
            headers: {
                "User-Agent": USER_AGENT,
                "X-Requested-With": "XMLHttpRequest"
            }
        });

        const finalSource = await decryptAjaxResponse(fetchRes.data);
        if (!finalSource.source) return { error: "No sources found" };

        finalSource.source.map(src => sources.push(src));
        finalSource.source_bk.map(src => sources_bk.push(src));

        return {
            Referer: gogoWatchLink.href,
            sources: sources,
            sources_bk: sources_bk
        }
    } catch (err) {
        console.log(err);
        return {
            error: true,
            error_message: err
        }
    }
};
exports.func = function(episodeId) {
    return getGogoanimeEpisodeSource(episodeId)
}