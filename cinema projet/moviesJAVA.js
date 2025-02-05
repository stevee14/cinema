const cleApi = "61317a5a";
const paramsUrl = new URLSearchParams(window.location.search);
const idFilm = paramsUrl.get('id');

const recupererDetailsFilm = async () => {
    const url = `https://www.omdbapi.com/?apikey=${cleApi}&i=${idFilm}&plot=full`;
    try {
        const reponse = await fetch(url);
        const film = await reponse.json();

        if (film.Response === "True") {
            afficherDetailsFilm(film);
        } else {
            document.getElementById('detailsFilm').innerHTML = "<p>Aucun détail trouvé pour ce film</p>";
        }
    } catch (erreur) {
        console.error("Erreur lors de la récupération des détails du film:", erreur);
    }
};

const afficherDetailsFilm = (film) => {
    const divDetailsFilm = document.getElementById('detailsFilm');
    divDetailsFilm.innerHTML = `
        <h1>${film.Title}</h1>
        <img src="${film.Poster}" alt="${film.Title}">
        <p><strong>Année :</strong> ${film.Year}</p>
        <p><strong>Genre :</strong> ${film.Genre}</p>
        <p><strong>Réalisateur :</strong> ${film.Director}</p>
        <p><strong>Acteurs :</strong> ${film.Actors}</p>
        <p><strong>Intrigue :</strong> ${film.Plot}</p>
    `;
};

recupererDetailsFilm();

