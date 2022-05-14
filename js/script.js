//INTEGRAÇÃO COM TMDB - CHAVE DE API

const API_KEY = 'api_key=4d4efa39693d29d922bd207ecc5fdaec'; //CHAVE API
const BASE_URL = 'https://api.themoviedb.org/3/'; //URL DE BASE PARA ENDPOINT
const BASE_URL_IMAGE = 'http://image.tmdb.org/t/p/' //URL DE BASE PARA ENDPOINT - IMAGEM
const API_LANGUAGE = '&language=pt-BR'; //DEFINE O IDIOMA DAS INFORMAÇÕES OBTIDAS NA API


const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// REDIRECIONA PARA A PÁGINA INICIAL SE NÃO TIVER ID NA URL
if (params && !params.id) {
    window.location = window.location.origin;
}

//////////////////////////// CONSTANTES PARA FILME ////////////////////////////////////////////////////////////////////////////

//ID DO FILME
var ID_FILME = params.id;

// CONFIGURA BOTÃO DE VOLTAR
const voltar = document.getElementById('voltar');
if (voltar) {
    voltar.href += '?id=' + ID_FILME;
}

//CONSULTA DETALHES FILME, CLASSIFICACAO INDICATIVA E VÍDEOS
const API_MOVIE = BASE_URL + 'movie/' + ID_FILME + '?' + API_KEY + API_LANGUAGE + '&append_to_response=release_dates,videos';

//CONSULTA CAST & CREW DO FILME
const API_MOVIE_CASTCREW = BASE_URL + 'movie/' + ID_FILME + '/credits?' + API_KEY + API_LANGUAGE;

//CONSULTA IMAGEM DE FUNDO
const API_MOVIE_IMAGEM = BASE_URL + 'movie/' + ID_FILME + '/images?' + API_KEY;

//CONSULTA RECOMENDAÇÕES BASEADAS NO FILME ATUAL
const API_MOVIE_RECOMENDACOES = BASE_URL + 'movie/' + ID_FILME + '/recommendations?' + API_KEY + API_LANGUAGE;

//CONSULTA SERVICOS DE STREAMING
const API_MOVIE_ONDEASSISTIR = BASE_URL + 'movie/' + ID_FILME + '/watch/providers?' + API_KEY;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CHAMADA DAS FUNÇÕES DO SITE
detalheFilme(API_MOVIE);
trailerFilme(API_MOVIE);
trailerFilme_streamings(API_MOVIE);
imagensFilme(API_MOVIE_IMAGEM);
detalheFilme_CastCrew(API_MOVIE_CASTCREW);
recomendaFilme(API_MOVIE_RECOMENDACOES);
exibeStreamings(API_MOVIE_ONDEASSISTIR);

//Pega as principais informações do filme
function detalheFilme(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("colunaesquerda-detalhes").innerHTML =
            `
    <h3 id="nomedofilme">${data.title}</h3>
    <h5 style="font-style: italic">${data.original_title}</h5>
    <table>
    <tr>
        <td style="padding-right: 10px;">
            <h6>${formataData(data.release_date)}</h6>
        </td>
        <td style="padding-right: 10px;">
            <h6>${data.genres.map(({ name }) => name).join(", ")}</h6>
        </td>
        <td style="padding-right: 10px;">
            <h6>${minHora(data.runtime)}</h6>
        </td>
    </tr>
    </table>
     <p class="lead">${data.tagline}</h6>
    <h6>Situação:</h6>
    <p>${traduzSituacao(data.status)}</p>
    <h6>Sinopse:</h6>
    <p style="text-align: justify;">${data.overview}</p>
    <h6>Orçamento:</h6>
    <p>${data.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'USD', })}</p>
    <h6>Receita:</h6>
    <p>${data.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'USD', })}</p>
    `);

    titleMuda(url);

    //Muda o título da aba de acordo com o nome do filme
    function titleMuda(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => document.title = data.title + ' - BGCS')
    }

    imagemHero(url);

    //Troca o fundo da div hero de acordo com o filme
    function imagemHero(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => document.getElementById("herofundo").style.backgroundImage = `linear-gradient(to right, rgba(20.20%, 18.43%, 26.67%, 0.8) 150px, rgba(30.20%, 18.43%, 26.67%, 0.8) 100%), 
            url('${BASE_URL_IMAGE}/original/${data.backdrop_path}')`);

    }

    imagemHero_streamings(url)

    //Troca o fundo da div hero de acordo com o filme
    function imagemHero_streamings(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => document.getElementById("topo").style.backgroundImage = `linear-gradient(to right, rgba(20.20%, 18.43%, 26.67%, 0.8) 150px, rgba(30.20%, 18.43%, 26.67%, 0.8) 100%), 
                url('${BASE_URL_IMAGE}/original/${data.backdrop_path}')`);

    }

    detalheFilme_streamings(url);

    function detalheFilme_streamings(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => document.getElementById("detalhesfilme_streaming").innerHTML =
            `
            <h2 style="text-align: left; text-transform: uppercase; font-weight: bolder;">${data.title}</h2>
            <h4>(${formataData_Ano(data.release_date)})</h4>
            <span class="badge badge-light" style="color: ${coloreNota(data.vote_average)}">${data.vote_average}</span>
            <span class="${classificaoIndicativa(data.release_dates.results.filter(({ iso_3166_1 }) => iso_3166_1 == "BR")[0].release_dates[0].certification)}">${data.release_dates.results.filter(({ iso_3166_1 }) => iso_3166_1 == "BR")[0].release_dates[0].certification}</span>
            <span class="badge badge-light">${minHora(data.runtime)}</span>
            <span class="badge badge-light">${data.genres.map(({ name }) => name).join(", ")}</span>
            <br><br>
            <p style="text-align: justify;">${data.overview}</p>

            `
            );
    }

    posterFilme_streamings(url);

    function posterFilme_streamings(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => document.getElementById("posterfullsize").innerHTML =
                `
        <img src='${data.poster_path ? BASE_URL_IMAGE : "https://via.placeholder.com/1944x2890?text=Sem+Poster"}/original/${data.poster_path}' id="poster"
        alt="poster">
        `
            )
    }

}

//Função para receber informações do elenco (cast) e da equipe de produção (crew)
function detalheFilme_CastCrew(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("colunaesquerda-cast&crew").innerHTML =
            `
         <h6>Direção:</h6>
        <p style="text-align: justify;">${data.crew.filter(({ job }) => job == "Director").map(({ name }) => name).join(", ")}</p>
        <h6>Roteiro:</h6>
        <p style="text-align: justify;">${data.crew.filter(({ job }) => job == "Screenplay").map(({ name }) => name).join(", ")}</p>
        `
        );

}

function exibeStreamings(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.results.BR.flatrate.length == 1) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    `

                        );
                }

            }
            else if (data.results.BR.flatrate.length == 2) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>  
                    `

                        );
                }
            }
            else if (data.results.BR.flatrate.length == 3) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[2].logo_path}"
                        id="servico"></a>        
                    `

                        );
                }
            }
            else if (data.results.BR.flatrate.length == 4) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[2].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[3].logo_path}"
                        id="servico"></a>           
                    `

                        );
                }
            }
            else if (data.results.BR.flatrate.length == 5) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[2].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[3].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[4].logo_path}"
                        id="servico"></a>             
                    `

                        );
                }
            }
            else if (data.results.BR.flatrate.length == 6) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[2].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[3].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[4].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[5].logo_path}"
                        id="servico"></a>                                      
                    `

                        );
                }
            }
            else if (data.results.BR.flatrate.length == 7) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[2].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[3].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[4].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[5].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[6].logo_path}"
                        id="servico"></a>                                        
                    `

                    );
                }
            }
            else if (data.results.BR.flatrate.length >= 8) {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[1].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[2].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[3].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[4].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[5].logo_path}"
                        id="servico"></a>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[6].logo_path}"
                        id="servico"></a>
                        <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[7].logo_path}"
                        id="servico"></a>                                                                 
                    `

                    );
                }
            }
            else {
                function detalheFilme_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                    `
                        <p>No momento, não há onde assistir este conteúdo.</p>       
                    `

                        );
                }
            }

            detalheFilme_ondeAssistir(url);

        })

}

function classificaoIndicativa(classificacao) {
    if (classificacao >= 16)
        return 'badge badge-danger'
    else if (classificacao > 12)
        return 'badge badge-warning'
    else
        return 'badge badge-success'
}

function coloreNota(voto) {
    if (voto >= 8)
        return 'green'
    else if (voto >= 5 && voto < 8)
        return 'orange'
    else
        return 'red'
}

//Trailer do filme - página detalhes
function trailerFilme(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("colunadireita-trailer").innerHTML =
            `
    <iframe width="600" height="315" src="https://www.youtube.com/embed/${data.videos.results[0].key}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen style="max-width: 100%;">
    </iframe>
    `
        );
}

//Trailer da série - página streamings
function trailerFilme_streamings(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if ((data.videos.results.length == 0)) {
                function exibeDestaque_streamings(url) {
                    fetch(url)
                    .then(res => res.json())
                    .then(data => document.getElementById("trailer").innerHTML =
                    `
                    <img src="${data.backdrop_path ? BASE_URL_IMAGE : "https://via.placeholder.com/1920x1080.?text=Busca+Global+em+Catálogo+de+Streaming"}/original/${data.backdrop_path}" class="img-destaque-abaixo-header" id="img-destaque-abaixo-header">
                    `
                    );
                }
            }
            else {
                function exibeDestaque_streamings(url) {
                    fetch(url)
                    .then(res => res.json())
                    .then(data => document.getElementById("trailer").innerHTML =
                `
                    <iframe width="900" height="500" src="https://www.youtube.com/embed/${data.videos.results[0].key}?controls=0"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen class="iframe-abaixo-header">
                    </iframe>
                `
                    );
                }
            }

            exibeDestaque_streamings(url);
            
        })
}

//Slide com 4 imagens do filme, começando pela segunda do array de imagens
function imagensFilme(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("colunadireita-slides").innerHTML =
            `
    <div id="carouselfilme" class="carousel slide" data-ride="carousel" style="max-width: 100%;">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="d-block w-100"
                src="${BASE_URL_IMAGE}/original/${data.backdrops[1].file_path}"
                alt="Primeiro slide">
        </div>
        <div class="carousel-item">
            <img class="d-block w-100"
                src="${BASE_URL_IMAGE}/original/${data.backdrops[2].file_path}"
                alt="Segundo slide">
        </div>
        <div class="carousel-item">
            <img class="d-block w-100"
                src="${BASE_URL_IMAGE}/original/${data.backdrops[3].file_path}"
                alt="Terceiro Slide">
        </div>
        <div class="carousel-item">
            <img class="d-block w-100"
                src="${BASE_URL_IMAGE}/original/${data.backdrops[4].file_path}"
                alt="Quarto Slide">
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselfilme" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Anterior</span>
    </a>
    <a class="carousel-control-next" href="#carouselfilme" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Próximo</span>
    </a>
    </div>
    `
        );

    imagemDestaque(url);

    //Imagem destaque do filme. A primeira do array de imagens.
    function imagemDestaque(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => document.getElementById("herofundo").innerHTML =
                `
        <img src="${BASE_URL_IMAGE}/original/${data.backdrops[0].file_path}" class="img-destaque-abaixo-header" id="img-destaque-abaixo-header">
        <div class="middle" id="overlay">
        <a href="streamings.html?id=${ID_FILME}" target="_self"><button type="button" class="btn btn-outline-light">Mais
                Detalhes</button></a>
        </div>
        `
            );
    }

}

function recomendaFilme(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("recomendacoes").innerHTML =
            `
        <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" style="margin-bottom: 15px">
            <div class="card h-100">
                <a href='detalhes.html?id=${data.results[0].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[0].poster_path}"
                    class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        <div class="col" style="margin-bottom: 15px">
            <div class="card h-100">
                <a href='detalhes.html?id=${data.results[1].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[1].poster_path}"
                    class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        <div class="col" style="margin-bottom: 15px">
             <div class="card h-100">
                <a href='detalhes.html?id=${data.results[2].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[2].poster_path}"
                    class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        <div class="col" style="margin-bottom: 15px">
             <div class="card h-100">
                <a href='detalhes.html?id=${data.results[3].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[3].poster_path}"
                    class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        </div>
        `
        );

}

//Converte o tempo do filme em horas (recebe em minutos)
function minHora(a) {
    var horas = Math.trunc(a / 60);
    var minutos = a % 60;
    return (horas + "h " + minutos + "m");
}

//Traduz o status do filme enviado pela API
function traduzSituacao(situacao) {
    if (situacao == 'Rumored')
        return 'Rumorado'
    else if (situacao == 'Planned')
        return 'Planejado'
    else if (situacao == 'In Production')
        return 'Em Produção'
    else if (situacao == 'Post Production')
        return 'Pós-produção'
    if (situacao == 'Released')
        return 'Lançado'
    else return 'Cancelado'
}

//Formata a data de MM-DD-YYYY (enviada pela API) para DD-MM-YYYY, conforme o formato brasileiro
function formataData(d) {
    d = new Date(d);
    const ano = new Intl.DateTimeFormat('br', { year: 'numeric' }).format(d)
    const mes = new Intl.DateTimeFormat('br', { month: '2-digit' }).format(d)
    const dia = new Intl.DateTimeFormat('br', { day: '2-digit' }).format(d)

    return (`${dia}/${mes}/${ano}`)
}

function formataData_Ano(d) {
    d = new Date(d);
    const ano = new Intl.DateTimeFormat('br', { year: 'numeric' }).format(d)
    const mes = new Intl.DateTimeFormat('br', { month: '2-digit' }).format(d)
    const dia = new Intl.DateTimeFormat('br', { day: '2-digit' }).format(d)

    return (`${ano}`)
}
