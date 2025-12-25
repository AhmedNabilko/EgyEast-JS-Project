let wrapper = document.getElementById('sliderWrapper');

let slides;
//^ create slide 
function createSlide(info) {

    let slide = document.createElement('div');
    slide.className = 'slide';
    slide.id = info.id;
    slide.style.backgroundImage = "url('" + info.hero + "')";


    let content = document.createElement('div');
    content.className = 'content';


    let tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerText = (info.rank === 1) ? "Masterpiece" : (info.rank <= 5) ? "Highly Rated" : "Recommended";

    let title = document.createElement('h2');
    title.className = 'title';
    title.innerText = info.title;

    let desc = document.createElement('p');
    desc.className = 'desc';
    desc.innerText = info.desc;

    let button = document.createElement('button');
    button.className = 'watch';

    button.innerHTML = '<i class="fa-solid fa-play"></i> Watch Now';
    button.addEventListener('click', () => {
        selectAnime(info.id);
        window.location.href = "../../pages/anime.html";
    });

    content.appendChild(tag);
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(button);

    slide.appendChild(content);


    return slide;
}



function createSlides(animeSlides) {
    wrapper.innerHTML = "";
    let slide;
    for (let i = 0; i < animeSlides.length; i++) {
        slide = createSlide(animeSlides[i]);
        wrapper.appendChild(slide);

    }
    slides = document.querySelectorAll('.slide');
}


//* move slider 
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let slideIndex = 0;
function moveSlide(step) {

    slideIndex = ((slideIndex + step + slides.length) % slides.length);

    wrapper.style.transform = "translateX(" + (-slideIndex) * 100 + "%)";
}
function moveSlides() {
    setInterval(() => {
        clearInterval();
        moveSlide(1);
    }, 3000);
}
prev.addEventListener('click', () => moveSlide(-1));
next.addEventListener('click', () => moveSlide(1));


moveSlides();

//& get cards
getTopAnime((animeList) => {

    let animeSlides = animeList.slice(0, 5);
    let animeCards = animeList.slice(5);
    createSlides(animeSlides);

    createAnimeCards(animeCards);

});



