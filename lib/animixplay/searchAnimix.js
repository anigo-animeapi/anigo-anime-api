const axios = require('axios');
const { load } = require('cheerio');
// const animixSearchApi = "https://cachecow.eu/api/search";  NOT CURRENTLY USED.
const animixSearchApi2 = "https://v1.ij7p9towl8uj4qafsopjtrjk.workers.dev/";

/**
 * 
 * @param {string} keyw 
 * @returns {Array<string>}
 */
async function searchAnimix(keyw) {
    try {
        if (!keyw) return {
            error: true,
            error_message: "No keyword provided"
        }
        var list = [];
        const fetchAnimix = await axios.request({
            url: animixSearchApi2,
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": USER_AGENT
            },
            data: new URLSearchParams({ q2: keyw })
        });

        const $ = load(fetchAnimix.data.result);
        $('li').each((index, element) => {
            list.push({
                animeTitle: $(element).find('div > a').attr("title"),
                animeId: $(element).find('div > a').attr('href').split("/v1/")[1],
                animeImg: $(element).find('.resultimg').attr('src')

            })
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
exports.func = function(keyw) {
    return searchAnimix(keyw)
}