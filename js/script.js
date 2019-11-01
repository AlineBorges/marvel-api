var privateKey = "83355aed9d59effedf5292aa38a80f6723a72162",
      publicKey = "06dd80e643de0453558d368f75317135",
      ofst = 0, 
      search = document.querySelector("#searchInput"),
      content = document.querySelector("#content");
      
const getApi = () => {
    const ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey),
    URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${ofst}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e)
            });
        });
};

const drawHero = e => {
    const image = `${e.thumbnail.path}/standard_fantastic.${e.thumbnail.extension}`;
    const hero = `
    <div class="heroProfile">
        <h3 class="heroTitle">${e.name}</h3>
        <img class="heroImg"src="${image}">
        <p class="heroDescription">${e.description}</p>
    </div>
    `;

    content.insertAdjacentHTML('beforeend', hero)
};

const nextPage = () =>{
        ofst += 100,
        ts = Date.now(),
        hash = MD5(ts + privateKey + publicKey),
        URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${ofst}`;
        
    fetch(URL)
    .then(response => response.json())
    .then(response => {
        response.data.results.forEach(e => {
            drawHero(e)
        }); 
    });     
}

const searchHero = name => {
    const heroName = encodeURIComponent(name),
    ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey),
    URL = `http://gateway.marvel.com/v1/public/characters?name=${heroName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(URL)
    .then(response => response.json())
    .then(response => {
        response.data.results.forEach(e => {
            drawHero(e);
        });
    });

    search.addEventListener('keyup', e => {
        if(e.keyCode === 13) {
            content.innerHTML = '';
            searchHero(e.target.value.trim());
            console.log(e);
        }
    });
}

getApi();