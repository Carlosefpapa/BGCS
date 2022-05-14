//INTEGRAÇÃO COM TMDB - CHAVE DE API

const API_KEY = 'api_key=4d4efa39693d29d922bd207ecc5fdaec'; //CHAVE API
const BASE_URL = 'https://api.themoviedb.org/3/'; //URL DE BASE PARA ENDPOINT
const BASE_URL_IMAGE = 'http://image.tmdb.org/t/p/' //URL DE BASE PARA ENDPOINT - IMAGEM
const API_LANGUAGE = '&language=pt-BR'; //DEFINE O IDIOMA DAS INFORMAÇÕES OBTIDAS NA API

//////////////////////////// CONSTANTES PARA SÉRIES ////////////////////////////

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// REDIRECIONA PARA A PÁGINA INICIAL SE NÃO TIVER ID NA URL
if (params && !params.id) {
    window.location = window.location.origin;
}

//ID DA SÉRIE
var ID_SERIE = params.id; //93405 62286 1402 1396 71712 1399 82856

// CONFIGURA BOTÃO DE VOLTAR
const voltar = document.getElementById('voltar');
if (voltar) {
    voltar.href += '?id=' + ID_SERIE;
}

//CONSULTA DETALHES DA SÉRIE, CLASSIFICAÇÃO E VÍDEOS
const API_SERIE = BASE_URL + 'tv/' + ID_SERIE + '?' + API_KEY + API_LANGUAGE + '&append_to_response=content_ratings,videos,external_ids';

//CONSULTA IMAGEM DE FUNDO
const API_SERIE_IMAGEM = BASE_URL + 'tv/' + ID_SERIE + '/images?' + API_KEY + API_LANGUAGE + 'include_image_language=en,null';

//CONSULTA RECOMENDAÇÕES BASEADAS NA SERIE ATUAL
const API_SERIE_RECOMENDACOES = BASE_URL + 'tv/' + ID_SERIE + '/recommendations?' + API_KEY + API_LANGUAGE;

//CONSULTA SERVICOS DE STREAMING
const API_SERIE_ONDEASSISTIR = BASE_URL + 'tv/' + ID_SERIE + '/watch/providers?' + API_KEY;

//CHAMADA DAS FUNÇÕES
detalheSerie(API_SERIE);
imagensSerie(API_SERIE_IMAGEM);
trailerSerie(API_SERIE);
trailerSerie_streamings(API_SERIE);
recomendaSerie(API_SERIE_RECOMENDACOES);
exibeStreamings(API_SERIE_ONDEASSISTIR);

function detalheSerie(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("colunaesquerda-detalhes-serie").innerHTML =
        `
        <a href='${data.homepage}' target='_blank'><img src='${BASE_URL_IMAGE}/original/${data.networks[0].logo_path}' style='width: 10%'></a>
        <a href='https://www.imdb.com/title/${data.external_ids.imdb_id}' target='_blank'><img src='https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png}' style='width: 8%'></a>
        <h3 id="nomedaserie">${data.name}</h3>
        <h5 style="font-style: italic">${data.original_name}</h5>
        <table>
        <tr>
            <td style="padding-right: 10px;">
                <h6>${data.genres.map(({ name }) => name).join(", ")}</h6>
            </td>
            <td style="padding-right: 10px;">
                <h6>${minHora(data.episode_run_time[0])}</h6>
            </td>
        </tr>
        </table>
         <p class="lead">${data.tagline}</h6>
        <h6>Situação:</h6>
        <p>${traduzSituacaoSerie(data.status)}</p>
        <h6>Sinopse:</h6>
        <p style="text-align: justify;">${data.overview}</p>
        <h6>Quantidade de temporadas:</h6>
        <p>${data.number_of_seasons}</p>
        <h6>Quantidade de episódios:</h6>
        <p>${data.number_of_episodes}</p>
        <h6>Criador(a):</h6>
        <div class="card" style="width: 10rem;">
        <img class="card-img-top" src="${data.created_by[0].profile_path ? BASE_URL_IMAGE : "https://i.pravatar.cc/1000?img=67"}/original/${data.created_by[0].profile_path}" alt="Card image cap">
        <div class="card-body">
        <p class="card-text">${data.created_by[0].name}</p>
        </div>
        </div>
        <br>
        `
        );

        titleMuda(url);

        //Muda o título da aba de acordo com o nome da série
        function titleMuda(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => document.title = data.name + ' - BGCS')
        }

        imagemHero(url);

        //Troca o fundo da div hero de acordo com a serie
        function imagemHero(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => document.getElementById("herofundo").style.backgroundImage = `linear-gradient(to right, rgba(20.20%, 18.43%, 26.67%, 0.8) 150px, rgba(30.20%, 18.43%, 26.67%, 0.8) 100%), 
                url('${BASE_URL_IMAGE}/original/${data.backdrop_path}')`);
    
        }

        imagemHero_streamings(url)

        //Troca o fundo da div hero de acordo com o serie
        function imagemHero_streamings(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => document.getElementById("topo").style.backgroundImage = `linear-gradient(to right, rgba(20.20%, 18.43%, 26.67%, 0.8) 150px, rgba(30.20%, 18.43%, 26.67%, 0.8) 100%), 
                    url('${BASE_URL_IMAGE}/original/${data.backdrop_path}')`);
    
        }

        detalheSerie_streamings(url);

        function detalheSerie_streamings(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => document.getElementById("detalhesserie_streaming").innerHTML =
                `
                <h2 style="text-align: left; text-transform: uppercase; font-weight: bolder;">${data.name}</h2>
                <h4>(${formataData_Ano(data.first_air_date)})</h4>
                <span class="badge badge-light" style="color: ${coloreNota(data.vote_average)}">${data.vote_average}</span>
                <span class="${classificaoIndicativa(data.content_ratings.results.filter(({ iso_3166_1 }) => iso_3166_1 == "BR")[0].rating)}">${data.content_ratings.results.filter(({ iso_3166_1 }) => iso_3166_1 == "BR")[0].rating}</span>
                <span class="badge badge-light">${minHora(data.episode_run_time[0])}</span>
                <span class="badge badge-light">${data.genres.map(({ name }) => name).join(", ")}</span>
                <br>
                <span class="badge badge-light">${data.number_of_seasons} temporada(s)</span>
                <span class="badge badge-light">${data.number_of_episodes} episódio(s)</span>
                <span class="badge badge-dark">${traduzSituacaoSerie(data.status)}</span>
                <br><br>
                <p style="text-align: justify;">${data.overview}</p>
    
                `
                );
        }

        posterSerie_streamings(url);

        function posterSerie_streamings(url) {
            fetch(url)
                .then(res => res.json())
                .then(data => document.getElementById("posterfullsize").innerHTML =
                    `
            <img src='${BASE_URL_IMAGE}/original/${data.poster_path}' id="poster"
            alt="poster">
            `
                )
        }
        
}

function exibeStreamings(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            
            if (data.results.BR.flatrate.length == 0) {
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                        `
                        
                        `
                        );
                }

            }

            else if (data.results.BR.flatrate.length == 1) {
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>
                    <a href="${data.results.BR.link}"
                    target="_blank"><img
                        src="${BASE_URL_IMAGE}/original/${data.results.BR.flatrate[0].logo_path}"
                        id="servico"></a>  
                    `

                        );
                }

            }
            else if (data.results.BR.flatrate.length == 2) {
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>    
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>                      
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                            `
                    <span class="badge badge-pill badge-primary" id="ondeassistir">Onde Assistir</span> <br>
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
                function detalheSerie_ondeAssistir(url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => document.getElementById("servicos_lista").innerHTML =
                    `
                        <p>No momento, não há onde assistir este conteúdo.</p>       
                    `

                        );
                }
            }

            detalheSerie_ondeAssistir(url)

        })

}

//Trailer da série - página streamings
function trailerSerie_streamings(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if ((data.videos.results.length == 0) || (data.videos.results[0].official == 0)) {
                function exibeDestaque_streamings(url) {
                    fetch(url)
                    .then(res => res.json())
                    .then(data => document.getElementById("trailer").innerHTML =
                    `
                    <img src="${BASE_URL_IMAGE}/original/${data.backdrop_path}" class="img-destaque-abaixo-header" id="img-destaque-abaixo-header">
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

//Trailer da serie - página detalhes
function trailerSerie(url) {
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

//Slide com 4 imagens da serie, começando pela segunda do array de imagens
function imagensSerie(url) {
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
        <a href="streamings-serie.html?id=${ID_SERIE}" target="_self"><button type="button" class="btn btn-outline-light">Mais
                Detalhes</button></a>
        </div>
        `
            );
    }

}

function recomendaSerie(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => document.getElementById("recomendacoes").innerHTML =
            `
        <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" style="margin-bottom: 15px">
            <div class="card h-100">
                <a href='detalhes-serie.html?id=${data.results[0].id}'>
                        <img src="${BASE_URL_IMAGE}/original/${data.results[0].poster_path}" class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        <div class="col" style="margin-bottom: 15px">
            <div class="card h-100">
                <a href='detalhes-serie.html?id=${data.results[1].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[1].poster_path}" class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        <div class="col" style="margin-bottom: 15px">
            <div class="card h-100">
                <a href='detalhes-serie.html?id=${data.results[2].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[2].poster_path}" class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        <div class="col" style="margin-bottom: 15px">
            <div class="card h-100">
                <a href='detalhes-serie.html?id=${data.results[3].id}'>
                    <img src="${BASE_URL_IMAGE}/original/${data.results[3].poster_path}" class="card-img-top" alt="..." />
                </a>
            </div>
        </div>
        </div>
        `
        );

}

//Traduz o status da série enviado pela API
function traduzSituacaoSerie(situacao) {
    if (situacao == 'Returning Series')
        return 'Renovada'
    else if (situacao == 'Canceled')
        return 'Cancelada'
    else if (situacao == 'In Production')
        return 'Em Produção'
    else if (situacao == 'Post Production')
        return 'Pós-produção'
    if (situacao == 'Released')
        return 'Lançado'
    else return 'Finalizada'
}

//Converte o tempo do episódio da série em horas/minutos (recebe em minutos)
function minHora(a) {
    var horas = Math.trunc(a / 60);
    var minutos = a % 60;
    return (horas + "h " + minutos + "m");
}

function formataData_Ano(d) {
    d = new Date(d);
    const ano = new Intl.DateTimeFormat('br', { year: 'numeric' }).format(d)
    const mes = new Intl.DateTimeFormat('br', { month: '2-digit' }).format(d)
    const dia = new Intl.DateTimeFormat('br', { day: '2-digit' }).format(d)

    return (`${ano}`)
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