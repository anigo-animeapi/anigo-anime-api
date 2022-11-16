const axios = require('axios');
const { load } = require('cheerio');

const gogoBase = "https://gogoanime.lu/";

const episodeListPage = "https://ajax.gogo-load.com/ajax/load-list-episode";

/**
 * 
 * @param {string} animeId 
 * @returns {Array<object}
 */
async function getGogoAnimeInfo(animeId) {
    try {
        let genres = [];
        let episodes = [];
        var list = {}
        const res = await axios.get(gogoBase + `category/${animeId}`);
        const $ = load(res.data);

        const animeTitle = $('div.anime_info_body_bg > h1').text();
        const animeImg = $('div.anime_info_body_bg > img').attr('src');
        const type = $('div.anime_info_body_bg > p:nth-child(4) > a').text();
        const synopsis = $('div.anime_info_body_bg > p:nth-child(5)').text().replace('Plot Summary: ', '');
        const releaseDate = $('div.anime_info_body_bg > p:nth-child(7)').text().replace('Released: ', '');
        const status = $('div.anime_info_body_bg > p:nth-child(8) > a').text();
        const otherNames = $('div.anime_info_body_bg > p:nth-child(9)').text().replace('Other name: ', '').replace(/;/g, ',');

        $('div.anime_info_body_bg > p:nth-child(6) > a').each((index, element) => {
            genres.push($(element).attr('title').trim());
        });

        const epStart = $("#episode_page > li").first().find('a').attr('ep_start');
        const epEnd = $('#episode_page > li').last().find('a').attr('ep_end');
        const movieId = $('#movie_id').attr('value');
        const alias = $('#alias_anime').attr('value');

        const episodesPage = await axios.get(`${episodeListPage}?ep_start=${epStart}&ep_end=${epEnd}&id=${movieId}&default_ep=${0}&alias=${alias}`);
        const $$ = load(episodesPage.data);

        $$("#episode_related > li").each((i, el) => {
            episodes.push({
                episodeId: $(el).find("a").attr("href").split('/')[1],
                epNum: $(el).find(`div.name`).text().replace('EP ', ''),
                episodeUrl: gogoBase + $(el).find(`a`).attr('href').trim()
            });
        });

        list = {
            animeTitle: animeTitle.toString(),
            type: type.toString(),
            synopsis: synopsis.toString(),
            animeImg: animeImg.toString(),
            releaseDate: releaseDate.toString(),
            status: status.toString(),
            genres,
            otherNames,
            eptotal: epEnd,
            episodes
        };

        return list;

    } catch (err) {
        console.log(err)
        return {
            error: true,
            error_message: err
        }
    }
};
exports.func = function(animeId) {
    return getGogoAnimeInfo(animeId);
}