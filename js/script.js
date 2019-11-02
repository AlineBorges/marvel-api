let ofst = 0;

const privateKey = "83355aed9d59effedf5292aa38a80f6723a72162",
      publicKey = "06dd80e643de0453558d368f75317135",
      search = document.querySelector("#searchInput"),
      content = document.querySelector("#content"),
      characterURL = `https://gateway.marvel.com/v1/public/characters?`,
      ts = Date.now(),
      hash = MD5(ts + privateKey + publicKey),
      baseParameters = `ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=99`;

const getAPI = (parameters = '') => {
    const URL = characterURL + baseParameters + `&offset=${ofst}` + parameters;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e)
            });
            if (response.data.total <= response.data.count + response.data.offset) {
                document.querySelector(".next").classList.add('hidden');
            }
        });
} 
      
const drawHero = e => {
    const image = `${e.thumbnail.path}/standard_fantastic.${e.thumbnail.extension}`;
    const hero = `
    <div class="heroProfile">
        <h3 class="heroTitle">${e.name}</h3>
        <img class="heroImg" src="${image}">
        <p class="heroDescription ${e.description ? null : "hidden" }">${e.description}</p>
    </div>
    `;
    content.insertAdjacentHTML('beforeend', hero)
};

const nextPage = () => {
    ofst += 99;
    getAPI(); 
}

const searchHero = name => {
    const heroName = encodeURIComponent(name);
    ofst = 0;
    getAPI(`&nameStartsWith=${heroName}`);
}

search.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
        content.innerHTML = '';
        searchHero(e.target.value.trim());
    }
});

getAPI();