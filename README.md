<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Anigo-AnimeAPI&fontSize=90&animation=fadeIn&fontAlignY=38&desc=anime%20streaming%20and%20discovery%20api&descAlignY=51&descAlign=62" align="center" style="width: 100%" />
</div>  

### <div align="center">Anigo-AnimeAPI is a anime streaming and discovery api built using NodeJS that scrapes Gogoanime and Animixplay to return data</div>  


<p align="center">
   <a href="https://github.com/anigo-animeapi/anigo-anime-api">
      <img src="https://img.shields.io/github/license/anigo-animeapi/anigo-anime-api?style=flat-square" alt="Github license">
    </a>
     <a href="https://github.com/anigo-animeapi/anigo-anime-api">
      <img src="https://img.shields.io/github/package-json/v/anigo-animeapi/anigo-anime-api?style=flat-square" alt="GitHub package.json version">
    </a>
</p>



<br/>

## Navigation
- [Navigation](#navigation)
- [Installation](#installation)
- [Search Anime using Gogoanime](#search-anime-using-gogoanime)
- [Search Anime using Animixplay](#search-anime-using-animixplay)
- [Get latest released episodes from Gogoanime](#get-latest-released-episodes-from-gogoanime)
- [Get latest released episodes from Animixplay](#get-latest-released-episodes-from-animixplay)
- [Get popular anime](#get-popular-anime)
- [Get all anime](#get-all-anime)
- [Get anime by genre](#get-anime-by-genre)
- [Get anime info from Gogoanime](#get-anime-info-from-gogoanime)
- [Get anime info from Animixplay](#get-anime-info-from-animixplay)
- [Get anime episodes (from animix's website)](#get-anime-episodes-from-animixs-website)
- [Get streaming URLs from Gogoanime](#get-streaming-urls-from-gogoanime)
- [Get streaming URLs from Animixplay](#get-streaming-urls-from-animixplay)


## Installation

```sh
npm install anigo-anime-api
```


### Search Anime using Gogoanime

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `keyw`    | `string` | **Required**. Keyword used to search for anime |
| `page`    | `int`    | **Optional**. Page number                      |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.searchGogo("Chainsaw-Man"));
```


### Search Anime using Animixplay


| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `keyw`    | `string` | **Required**. Keyword used to search for anime |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.searchAnimix("Chainsaw-Man"));
```





### Get latest released episodes from Gogoanime


| Parameter | Type  | Description                                                                                                            |
| :-------- | :---- | :--------------------------------------------------------------------------------------------------------------------- |
| `type`    | `int` | **Required**. Type 1: Japanese Audio/Eng subs. Type 2: English Audio/No Subs. Type 3: Chinese Audio/Eng subs |
| `page`    | `int` | **Optional**. Page number                                                                                              |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getGogoRecentEpisodes(1));
```





### Get latest released episodes from Animixplay
                                                                                       

Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getRecentEpisodesFromAnimix());
```



### Get popular anime


| Parameter | Type  | Description                                                                         |
| :-------- | :---- | :---------------------------------------------------------------------------------- |
| `type`    | `int` | **Required**. Type 1: Weekly most viewed. Type 2: Most viewed of all time |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getPopular(1));
```



### Get all anime

| Description                                                    |
| :------------------------------------------------------------- |
| List of all animes on Animixplay |


Example: 

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getAllAnime());
```





### Get anime by genre


| Parameter | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `genre`  | `string` | **Required**. Genre. Automatically sorts results by popularity |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.searchAnimeByGenre("Isekai"));
```





### Get anime info from Gogoanime


| Parameter  | Type     | Description                                           |
| :--------- | :------- | :---------------------------------------------------- |
| `animeId` | `string` | **Required**. animeId (received from other api calls) |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getGogoAnimeInfo("one-piece"));
```



### Get anime info from Animixplay


| Parameter | Type  | Description                                                                   |
| :-------- | :---- | :---------------------------------------------------------------------------- |
| `malId`  | `int` | **Required**. MyAnimeList ID of the anime, also received through some functions. |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getAnimeInfoFromAnimix(35507));
```


### Get anime episodes (from animix's website)


| Parameter  | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `animeId` | `string` | **Required**. animeId (received from other api calls). |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getEpisodeInfoFromAnimix("one-piece"));
```


### Get streaming URLs from Gogoanime


| Parameter    | Type     | Description                                                       |
| :----------- | :------- | :---------------------------------------------------------------- |
| `episodeId` | `string` | **Required**. episodeId received from gogoanime anime info function. |


Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getGogoanimeEpisodeSource("one-piece-episode-1015"));
```




### Get streaming URLs from Animixplay


| Parameter    | Type     | Description                                         |
| :----------- | :------- | :-------------------------------------------------- |
| `name` | `string` | **Required**. Name of the anime. |
| `epNum` | `string` | **Required**. Episode number. |



Example:

```js
const anigo = require("anigo-anime-api");
console.log(await anigo.getEpisodeSourceFromAnimix("One Piece", "1015"));
```