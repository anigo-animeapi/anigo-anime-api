const axios = require('axios');
const { load } = require('cheerio');

const gogoBase = "https://gogoanime.lu/";
/**
 * 
 * @param {string} keyw 
 * @param {number} [page=1] 
 * @returns {Array<string}
 */
async function searchGogo(keyw, page = 1) {
    try {
        if (!keyw) return {
            error: true,
            error_message: "No keyword provided"
        }
        const fetchSearchPage = await axios.get(gogoBase + `/search.html?keyword=${keyw}&page=${page}`)
        const $ = load(fetchSearchPage.data)
var list = [];
        $('div.last_episodes > ul > li').each((index, element) => {
            list.push({
                animeId: $(element).find('p.name > a').attr('href').split('/')[2],
                animeTitle: $(element).find('p.name > a').attr('title'),
                animeUrl: gogoBase + "/" + $(element).find('p.name > a').attr('href'),
                animeImg: $(element).find('div > a > img').attr('src'),
                status: $(element).find('p.released').text().trim()
            });
        });

        return list;
    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};

exports.func = function(keyw, page) {
    return searchGogo(keyw, page)
}