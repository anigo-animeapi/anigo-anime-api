const axios = require('axios');
const CryptoJS = require('crypto-js');

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const headerOption = { "User-Agent": USER_AGENT, "X-Requested-With": "XMLHttpRequest" };

const decryptKeyLink = "https://raw.githubusercontent.com/consumet/rapidclown/main/key.txt";

async function scrapeSource(serverId) {
    const res = await axios.get(`https://zoro.to//ajax/v2/episode/sources?id=${serverId}`, {
        headers: headerOption
    })
    const rapidLink = res.data.link;

    const rapidId = rapidLink?.split("/").pop().split("?")[0];
    const rapidAjax = await axios.get(`https://rapid-cloud.co/ajax/embed-6/getSources?id=${rapidId}`, {
        headers: headerOption
    });

    const sources = rapidAjax.data.sources;
    const decryptKey = await (await axios.get(decryptKeyLink)).data;

    const source = CryptoJS.AES.decrypt(sources, decryptKey).toString(CryptoJS.enc.Utf8);

    return {
        sources: JSON.parse(source),
        tracks: rapidAjax.data.tracks
    }
}
 module.exports = {scrapeSource}