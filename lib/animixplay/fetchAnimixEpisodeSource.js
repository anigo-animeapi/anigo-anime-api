const axios = require('axios');
const { load } = require('cheerio');

const animixBase = "https://animixplay.to/"


const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { headers: { "User-Agent": USER_AGENT } };

// consting helper functions
const {
    encodeString,
    decodeStreamingLinkAnimix
} = require('../helper/utils.js');

/**
 * 
 * @param {string} name
 * @param {string} epNum
 * @returns {Array<object>}
 */
async function getEpisodeSourceFromAnimix(name, epNum) {
    try {
        let sources = [];
        let sources_bk = [];
        let type;
        let episodeGogoLink;

        // if (!episodeId) return {
        //     error: "No episode ID provided"
        // }
        const episodeId = name.split(" ").join("-").toLocaleLowerCase() + '-episode-' + epNum.split(" ");
        
        const animeId = episodeId.split("-").reverse().splice(2).reverse().join("-")
        const episodeNum = episodeId.split("-").splice(-1).join("");

        const res = await axios.get(animixBase + `v1/${animeId}`, headerOption);
        const $ = load(res.data)
        const epList = JSON.parse($("#epslistplace").text());

        if (epList.extra) {
            if (episodeNum in epList.extra) {
                episodeGogoLink = new URL("https:" + epList.extra[episodeNum]);
            } else {
                episodeGogoLink = new URL("https:" + epList[episodeNum - 1]);
            };
        }
        else {
            episodeGogoLink = new URL("https:" + epList[episodeNum - 1]);
        };

        let liveApiLink;

        //Checking if the episode source link is already a Plyr link or not
        if (episodeGogoLink.href.includes("player.html")) {
            liveApiLink = episodeGogoLink.href;
        } else {
            const content_id = episodeGogoLink.searchParams.get("id");
            liveApiLink = "https://animixplay.to/api/cW9" + encodeString(`${content_id}LTXs3GrU8we9O${encodeString(content_id)}`);
        };

        const src = await decodeStreamingLinkAnimix(liveApiLink);

        if (src.includes("player.html")) {
            type = "plyr"
        } else if (src.includes(".m3u8")) {
            type = "hls"
        } else if (src.includes(".mp4")) {
            type = "mp4"
        };

        return {
            animeId,
            episodeNum,
            sources: src
        }
    } catch (err) {
        // console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};

exports.func = function(name, epNum) {
    return getEpisodeSourceFromAnimix(name, epNum)
}