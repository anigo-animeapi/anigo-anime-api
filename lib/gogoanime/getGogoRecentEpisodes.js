const axios = require('axios');
const { load } = require('cheerio');

const gogoBase = "https://gogoanime.lu/";
const gogoajax = "https://ajax.gogo-load.com/";

/**
 * 
 * @param {number} [type=1] 
 * @param {number} [page=1] 
 * @returns {Array<string}
 */
async function getGogoRecentEpisodes(type = 1 , page = 1) {
    try {
        const res = await axios.get(gogoajax + `ajax/page-recent-release.html?page=${page}&type=${type}`)
        const $ = load(res.data)
var list = []
        $('div.last_episodes.loaddub > ul > li').each((i, el) => {
            list.push({
                episodeId: $(el).find('p.name > a').attr('href').split('/')[1],
                animeTitle: $(el).find('p.name > a').attr('title'),
                episodeNum: $(el).find('p.episode').text().replace('Episode ', '').trim(),
                subOrDub: $(el).find('div > a > div').attr('class').replace('type ic-', ''),
                animeImg: $(el).find('div > a > img').attr('src'),
                episodeUrl: gogoBase + "/" + $(el).find('p.name > a').attr('href')
            })
        })

        return list;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};
exports.func = function(type, page) {
    return getGogoRecentEpisodes(type, page);
}