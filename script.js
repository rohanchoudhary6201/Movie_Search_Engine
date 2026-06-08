const API_KEY = "CSv1Any6UgBCt332DMNVjZ5VKcNBAYZwko6kYbvO";

window.onload = loadPopularMovies;

// async function loadPopularMovies(){

//     const url =
//     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     displayMovies(data.results);
// }
async function loadPopularMovies() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        displayMovies(data.results);

    } catch (error) {
        console.error(error);
    }
}

async function searchMovies(){

    const query =
    document.getElementById("searchInput").value;

    if(query === "") return;

    const url =
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    displayMovies(data.results);
}

function displayMovies(movieList){

    const movies =
    document.getElementById("movies");

    movies.innerHTML = "";

    movieList.forEach(movie => {

        const poster =
        movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

        movies.innerHTML += `
        <div class="card">

            <img src="${poster}">

            <div class="info">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average}</p>
                <p>${movie.release_date || "Unknown"}</p>

                <button onclick="playTrailer(${movie.id})">
                    ▶ Watch Trailer
                </button>
            </div>

        </div>
        `;
    });
}

async function playTrailer(movieId){

    const url =
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const trailer =
    data.results.find(
        v => v.site === "YouTube" && v.type === "Trailer"
    );

    if(trailer){

        document.getElementById("modal").style.display = "block";

        document.getElementById("trailerFrame").src =
        `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;

    }else{
        alert("Trailer not available.");
    }
}

function closeTrailer(){

    document.getElementById("modal").style.display = "none";

    document.getElementById("trailerFrame").src = "";
}
