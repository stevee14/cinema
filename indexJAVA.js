const cleApi = "61317a5a"; 

// Liste des IDs des films en tendance
const filmsTendance = [
    "tt18259086", // sonic
    "tt10872600", // spider man
    "tt1201607"  // harry potter
];

// Liste des IDs des films supplémentaires
const plusDeFilms = [
    "tt0071562",  // The Godfather: Part II
    "tt0111161", // The Shawshank Redemption
    "tt0068646"  // The Godfather
];

document.addEventListener('DOMContentLoaded', () => {
    recupererFilms(filmsTendance);
});

function recupererFilms(idsFilms) {
    idsFilms.forEach(idFilm => {
        const url = `https://www.omdbapi.com/?apikey=${cleApi}&i=${idFilm}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    afficherFilm(data);
                } else {
                    console.error("Erreur lors de la récupération du film:", data.Error);
                }
            })
            .catch(error => console.error("Erreur lors de la récupération des films:", error));
    });
}

function afficherFilm(film) {
    const filmsContainer = document.getElementById('films');
    const filmCard = document.createElement('div');
    filmCard.className = 'carte-film';
    filmCard.innerHTML = `
        <img src="${film.Poster}" alt="Poster de ${film.Title}">
        <div class="film-info">
            <h2>${film.Title}</h2>
            <p>${film.Plot}</p>
            <a href="movie.html?id=${film.imdbID}">En savoir plus</a>
        </div>
    `;
    filmsContainer.appendChild(filmCard);
}

function chargerPlusDeFilms() {
    recupererFilms(plusDeFilms);

    document.getElementById('loadMore').style.display = 'none';
}