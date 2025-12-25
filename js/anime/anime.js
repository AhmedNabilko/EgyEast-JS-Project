let title = document.getElementById("title");
let date = document.getElementById("date");
let genre = document.getElementById("genre");
let desc = document.getElementById("desc");

let poster = document.getElementById("poster");
let hero = document.getElementById("hero");
let grid = document.getElementById("grid");
let favorite = document.getElementById("favourite");
let watch = document.getElementById("watch");
let back = document.getElementById("backBtn");


let selectedAnime;

back.addEventListener('click', () => {
    window.location.href = "index.html";
    title.innerText = "";
    date.innerText = "";
    genre.innerText = "";
    desc.innerText = "";
    poster.src = "";
    hero.style.backgroundImage = "";
    grid.innerHTML = "";


    favorite.classList.remove('selected');
    deleteSelectedAnime();


});

function updateFavoriteState(isFavorite) {
    if (isFavorite) {
        favorite.classList.add('selected');
    } else {
        favorite.classList.remove('selected');
    }
}

function clickFavorite() {

    selectedAnime.isFavorite = !selectedAnime.isFavorite;

    if (selectedAnime.isFavorite) {
        addToFavorites(getCurrentUser(), selectedAnime.id);
    } else {
        removeFromFavorites(getCurrentUser(), selectedAnime.id);
    }


    updateFavoriteState(selectedAnime.isFavorite);
}

favorite.addEventListener('click', clickFavorite);



function createAnimePage(anime) {
    selectedAnime = anime;
    selectedAnime.isFavorite = isFavoriteAnime(anime.id);

    title.innerText = anime.title;
    date.innerText = anime.date;
    genre.innerText = anime.genre;
    desc.innerText = anime.desc;
    poster.src = anime.poster;
    hero.style.backgroundImage = "url('" + anime.hero + "')";

    updateFavoriteState(selectedAnime.isFavorite);


    watch.onclick = () => {
        window.location.href = anime.watch;
    };


    getAnimePictures(anime.id, (pictures) => {


        grid.innerHTML = "";
        for (let i = 0; i < pictures.length && i < 3; i++) {

            selectedAnime.photos.push(pictures[i]);

            let card = document.createElement('div');
            card.className = "card"
            let photo = document.createElement('img');
            photo.src = pictures[i];
            photo.alt = "Scene" + (i + 1);
            card.appendChild(photo);


            grid.appendChild(card);
        }


    });


}
let animeID = getselectedAnimeID();

getAnimeDetails(animeID, (animeData) => {
    createAnimePage(animeData);

});


