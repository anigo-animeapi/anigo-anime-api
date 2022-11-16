const axios = require("axios");
const { load } = require('cheerio');

const zoroBase = "https://zoro.to";


/**
 * 
 * @param {string} keyw 
 * @param {number} [page=1] 
 * @returns {Array<string>}
 */
async function searchZoro(keyw, page = 1) {
    try {
        if (!keyw) return {
            error: true,
            error_message: "No keyword provided"
        };

        const res = await axios.get(zoroBase + `/search?keyword=${keyw}&page=${page}`);
        const $ = load(res.data);
var list = [];
        $('div.film_list-wrap > div.flw-item').each((i, el) => {
            list.push({
                animeTitle: $(el).find('div.film-detail > .film-name > a').text(),
                animeId: $(el).find('div.film-detail > .film-name > a').attr('href').split('/')[1].split('?')[0],
                animeImg: $(el).find('div.film-poster > img').attr('data-src')
            })
        })

        return list;
    } catch (err) {
        return {
            error: true,
            error_message: err
        }
    }
}
exports.func = function(keyw, page) {
    return searchZoro(keyw, page)
}