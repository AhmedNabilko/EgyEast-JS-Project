function selectAnime(id) {
    if (hasCookie("selectedAnime")) {
        deleteSelectedAnime();
    }
    setCookie("selectedAnime", JSON.stringify(id));

}
function getselectedAnimeID() {
    let id;
    if (hasCookie("selectedAnime")) {

        let encodedData = getCookie("selectedAnime");
        let jsonString = decodeURIComponent(encodedData);
        id = JSON.parse(jsonString);

    }
    return id;

}
function deleteSelectedAnime() {
    deleteCookie("selectedAnime");
}

function isFavoriteAnime(id) {
    let currentUser = getCurrentUser();
    console.log(currentUser);
    return currentUser.favouriteAnime.includes(id);
}

