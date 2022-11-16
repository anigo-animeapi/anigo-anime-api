declare module "anigo-anime-api" {
    // interface AnimixAnimeInfo {
    //     animeTitle: string,
    //     animeId: string,
    //     mal_id: number,
    //     animeImg: string,
    //     episodes: null,
    //     status: string,
    //     score: number,
    //     synopsis: string,
    //     genres: Array<string>,
    //     studios: Array<string>,
    //     gogoAnimeLink: Array<{
    //         url: string,
    //         title: string
    //         }>,
    //     animepaheLink: Array<{
    //         url: string,
    //         title: string
    //         }>,
    //     zoroLink: Array<{
    //         url: string,
    //         title: string
    //         }>
    // }
    // interface AnimixEpInfo {
    //     animeId: string,
    //     episodeNum: string,
    //     sources: Array<{ file: string, type: string}>
    // }

            /**
             * Get all anime with Animixplay
             */
            function getAllAnime(): Array<string>;
            /**
             * Get anime info from Animixplay
             */
            function getAnimeInfoFromAnimix(malId:string): Array<object>;
            /**
             * Get anime episodes (from animix's website)
             */
            function getEpisodeInfoFromAnimix(animeId:string): Array<object>;
            /**
             * Get streaming URLs from Animixplay
             */
            function getEpisodeSourceFromAnimix(name:string, epNum:string): Array<object>;
            /**
             * Get latest released episodes from Animixplay
             */
            function getRecentEpisodesFromAnimix(): Array<string>;
            /**
             * Search Anime from Animixplay
             */
            function searchAnimix(keyw:string): Array<string>;
            /**
             * Get anime info from Gogoanime
             */
            function getGogoAnimeInfo(animeId:string): Array<object>;
            /**
             * Get latest released episodes from Gogoanime
             */
            function getGogoRecentEpisodes(type?:number, page?:number): Array<string>;
            /**
             * Get streaming URLs from Gogoanime
             */
            function getGogoanimeEpisodeSource(episodeId:string): Array<object>;
            /**
             * Search Anime with Gogoanime
             */
            function searchGogo(keyw:string, page?:number): Array<string>;
            /**
             * Search Anime from Zoro
             */
            function searchZoro(keyw:string, page?:number): Array<string>;
            /**
             * Get anime info from Zoro
             */
            function getAnimeInfoFromZoro(zoroId:string): Array<object>;
            /**
             * Get streaming URLs from Zoro
             */
            function getEpisodeSourceFromZoro(episodeId:string): Array<object>;
            /**
             * Get anime by genre
             */
            function searchAnimeByGenre(genre:'Action' | 'Adventure' | 'Anti-Hero' | 'CGDCT' | 'College' | 'Comedy' | 'Drama' | 'Ecchi' | 'Fantasy' | 'Gag Humor' | 'Game' | 'Harem' | 'Historical' | 'Horror' | 'Idol' | 'Isekai' | 'Iyashikei' | 'Josei' | 'Kids' | 'Magical Girl' | 'Martial Arts' | 'Mecha' | 'Military' | 'Movie' | 'Music' | 'Mythology' | 'Mystery' | 'Otaku' | 'Parody' | 'Police' | 'Psychological' | 'Racing' | 'Revenge' | 'Romance' | 'Rural' | 'Samurai' | 'School' | 'Sci-Fi' | 'Seinen' | 'Shoujo' | 'Shoujo Ai' | 'Shounen' | 'Shounen Ai' | 'Slice of Life' | 'Space' | 'Sports' | 'Super Power' | 'Supernatural' | 'Survival' | 'Suspense' | 'Time Travel' | 'Vampire' | 'Work'): Array<string>;
            /**
             * Get popular anime
             */
            function getPopular(type?:number): Array<string>;
    
}