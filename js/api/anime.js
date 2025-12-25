
function extractAnimeData(animeResponse) {

    return {
        id: animeResponse.mal_id,
        title: animeResponse.title || animeResponse.title_english,
        date: animeResponse.year || "Unknown",
        type: animeResponse.type,
        score: animeResponse.score,
        desc: animeResponse.synopsis,
        rating: animeResponse.rating,
        rank: animeResponse.rank,

        genre: animeResponse.genres && animeResponse.genres.length > 0 ? animeResponse.genres[0].name : "",

        poster: animeResponse.images.jpg.large_image_url,


        hero: (animeResponse.trailer.images && animeResponse.trailer.images.maximum_image_url)
            ? animeResponse.trailer.images.maximum_image_url
            : animeResponse.images.jpg.large_image_url,

        watch: animeResponse.trailer.embed_url,


        photos: animeResponse.images.jpg.image_url ? [animeResponse.images.jpg.image_url] : [],
    };
}
function extractAnimePicturesData(picturesResponse) {
    let pictures = [];
    for (let i = 0; i < picturesResponse.length; i++) {
        pictures.push(picturesResponse[i].jpg.image_url);
    }
    return pictures;
}

function makeRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send("");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                callback(response.data);
            } else {
                throw new Error("Error to get data from" + url);


            }
        }
    };
}


function getTopAnime(onSuccess) {
    let url = "https://api.jikan.moe/v4/top/anime";

    makeRequest(url, function (data) {

        let animeList = [];
        for (let i = 0; i < data.length; i++) {
            animeList.push(extractAnimeData(data[i]));
        }
        onSuccess(animeList);
    });
}


function getAnimeDetails(id, onSuccess) {
    let url = "https://api.jikan.moe/v4/anime/" + id;

    makeRequest(url, function (data) {
        let anime = extractAnimeData(data);
        onSuccess(anime);
    });
}
function getAnimePictures(id, onSuccess) {
    let url = "https://api.jikan.moe/v4/anime/" + id + "/pictures";

    makeRequest(url, function (data) {
        let pictures = extractAnimePicturesData(data);
        onSuccess(pictures);
    });
}
function getAnimeListByIds(ids, onSuccess) {
    let results = [];
    let count = 0;

    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];

        getAnimeDetails(id, function (anime) {
            results.push(anime);


            count++;

            if (count === ids.length) {
                onSuccess(results);
            }
        });
    }
}