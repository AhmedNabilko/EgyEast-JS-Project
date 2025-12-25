//& get cards
let ids = getCurrentUser().favouriteAnime;

getAnimeListByIds(ids, (animeCards) => {
    createAnimeCards(animeCards);

});

