const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4d4efa39693d29d922bd207ecc5fdaec&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/original";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=4d4efa39693d29d922bd207ecc5fdaec&query=";
const API_LANGUAGE = '&language=pt-BR'; //DEFINE O IDIOMA DAS INFORMAÇÕES OBTIDAS NA API


// objeto do js para pegar os valores da url 
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if(params.type === 'tv'){
    window.location = `/resultado-series.html?s=${params.s}`;
}

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// inicialmente obter filmes da pesquisa
if (params && params.s){
    PegarMovies(SEARCHAPI + params.s + API_LANGUAGE);
    search.value = params.s;  
}

// puxa os dados da api 
async function PegarMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}
// atualiza o html com o resultado da api 
function showMovies(movies) {
    // limpar principal
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, id} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("col");
        movieEl.classList.add("movie");
        movieEl.id = title;
        movieEl.innerHTML = `
            <div class="card shadow-sm">
                <img class="d-block w-100"
                    src="${poster_path? IMGPATH + poster_path : "http://via.placeholder.com/1080x1580"}">
                <div class="card-body">
                    <p class="card-text">${title}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <a href="detalhes.html?id=${id}" target="_self"><button type="button"
                                    class="btn btn-primary">Ver Mais</button></a>
                        </div>
                    </div>
                </div>
            </div>`
        main.appendChild(movieEl);
    });
}
//Chama uma função quando uma pesquisa for feita sem precisar atualizar a pagina 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        PegarMovies(SEARCHAPI + searchTerm + API_LANGUAGE);

    }
});