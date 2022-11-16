const axios = require('axios');
const { load } = require('cheerio');

const animixBase = "https://animixplay.to/"


const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";


const GENRES = [
    'Action', 'Adventure', 'Anti-Hero', 'CGDCT', 'College', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Gag Humor',
    'Game', 'Harem', 'Historical', 'Horror', 'Idol', 'Isekai', 'Iyashikei', 'Josei', 'Kids', 'Magical Girl',
    'Martial Arts', 'Mecha', 'Military', 'Movie', 'Music', 'Mythology', 'Mystery', 'Otaku', 'Parody', 'Police',
    'Psychological', 'Racing', 'Revenge', 'Romance', 'Rural', 'Samurai', 'School', 'Sci-Fi', 'Seinen', 'Shoujo',
    'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural',
    'Survival', 'Suspense', 'Time Travel', 'Vampire', 'Work'
]

const {firstLetterToUpperCase} = require("../helper/utils.js");
/**
 * 
 * @param {'Action' | 'Adventure' | 'Anti-Hero' | 'CGDCT' | 'College' | 'Comedy' | 'Drama' | 'Ecchi' | 'Fantasy' | 'Gag Humor' | 'Game' | 'Harem' | 'Historical' | 'Horror' | 'Idol' | 'Isekai' | 'Iyashikei' | 'Josei' | 'Kids' | 'Magical Girl' | 'Martial Arts' | 'Mecha' | 'Military' | 'Movie' | 'Music' | 'Mythology' | 'Mystery' | 'Otaku' | 'Parody' | 'Police' | 'Psychological' | 'Racing' | 'Revenge' | 'Romance' | 'Rural' | 'Samurai' | 'School' | 'Sci-Fi' | 'Seinen' | 'Shoujo' | 'Shoujo Ai' | 'Shounen' | 'Shounen Ai' | 'Slice of Life' | 'Space' | 'Sports' | 'Super Power' | 'Supernatural' | 'Survival' | 'Suspense' | 'Time Travel' | 'Vampire' | 'Work'} genre 
 * @returns {Array<string} 
 */
async function searchAnimeByGenre(genre) {
    try {
        if (!genre) {
            return {
                error: true,
                error_message: "No genre provided"
            }
        };
        var list = []
        if (genre.toLowerCase() === "anti-hero") {
            genre = "Anti-Hero"
        } else if (genre.toLowerCase() === "cgdct") {
            genre = "CGDCT"
        } else if(!GENRES.includes(genre)) {
            genre = firstLetterToUpperCase(genre);
        }

        if (!GENRES.includes(genre)) {
            return {
                error: true,
                error_message: "This genre does not exist."
            }
        };

        const res = await axios.request({
            url: animixBase + "api/search",
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": USER_AGENT
            },
            data: new URLSearchParams({ genre, minstr: 99999999, orderby: "popular" })
        });

        res.data.result.map((anime) => {
            list.push({
                animeTitle: anime.title,
                animeId: anime.url.split("/v1/")[1],
                animeImg: anime.picture,
                animeSeason: anime.infotext,
                score: anime.score / 100
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
exports.func = function(genre) {
    return searchAnimeByGenre(genre)
}