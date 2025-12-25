
//& create card 

function createCard(anime) {

    let card = document.createElement('div');
    card.className = 'card';
    card.id = anime.id;

    let poster = document.createElement('div');
    poster.className = 'poster';

    let animePoster = document.createElement('img');
    animePoster.src = anime.poster;
    animePoster.alt = anime.title + ' Poster';
    poster.appendChild(animePoster);


    let info = document.createElement('div');
    info.className = 'info';

    let title = document.createElement('h4');
    title.innerText = anime.title;

    let genre = document.createElement('span');
    genre.innerText = anime.date + "•" + anime.genre;

    info.appendChild(title);
    info.appendChild(genre);


    card.appendChild(poster);
    card.appendChild(info);
    card.addEventListener('click',
        () => {
            selectAnime(anime.id);
            window.location.href = "../../pages/anime.html";

        })
    return card;
}
function createAnimeCards(animeList) {
    let grid = document.getElementById("cards");
    let card;
    grid.innerHTML = "";

    for (let i = 0; i < animeList.length; i++) {
        card = createCard(animeList[i]);
        grid.appendChild(card);
    }

}

//! Logout 

let logout = document.getElementById('logout');

logout.addEventListener('click', () => {

    logoutNow();


    alert("GoodBye :)");
});