const champRecherche = document.getElementById("rechercher");
const divResultats = document.getElementById("résultats");
const boutonPlusDeFilms = document.getElementById("plusdefilm");

let pageActuelle = 1;
let requeteRecherche = "";

const cleApi = "61317a5a";

const recupererFilms = async (page = 1) => {
    const requete = champRecherche.value.trim();
    if (requete === requeteRecherche && page === 1) return;

    requeteRecherche = requete;

    if (page === 1) {
        divResultats.innerHTML = ""; 
    }

    if (requete.length > 0) {
        const url = `https://www.omdbapi.com/?apikey=${cleApi}&s=${requete}&type=movie&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                afficherResultats(data.Search);
                pageActuelle = page; 
                boutonPlusDeFilms.style.display = "block";
            } else {
                boutonPlusDeFilms.style.display = "none";
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
        }
    } else {
        divResultats.innerHTML = "";
        boutonPlusDeFilms.style.display = "none";
    }
};


const afficherResultats = (films) => {
    films.forEach(film => {
        const filmDiv = document.createElement("div");
        filmDiv.classList.add("film");
        filmDiv.innerHTML = `
            <img src="${film.Poster}" alt="${film.Title}">
            <h3>${film.Title}</h3>
            <a href="movie.html?id=${film.imdbID}" class="bouton-bleu" >En savoir plus</a>
        `;
        divResultats.appendChild(filmDiv);
    });
};

const plusDeFilms = () => {
    recupererFilms(pageActuelle + 1); 
};

champRecherche.addEventListener("input", () => recupererFilms(1)); 
boutonPlusDeFilms.addEventListener("click", plusDeFilms); 
