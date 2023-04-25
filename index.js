// let add = document.getElementById('add-height');

// add.addEventListener("click", () => {
//     alert("hi")
// })
let addheight = document.querySelectorAll(".questions")
addheight.forEach(element => {
    element.addEventListener("click", () => {
        element.classList.toggle("active")
    })
});
const apikay = "c1dced5616e82d1f41ca28c08de5e38d";
const apiendpoint = "https://api.themoviedb.org/3/";
const imgPath = "https://image.tmdb.org/t/p/original";
const apipath = {
    fetchAllCategories: `${apiendpoint}/genre/movie/list?api_key=${apikay}`,
    fetchMoviesList: (id) => `${apiendpoint}/discover/movie?api_key=${apikay}&with_genres=${id}`,


}
// console.log(apipath.fetchMoviesList);
// function init(params) {
//     fetch(apipath.fetchAllCategories)
//         .then(res => res.json())
//         .then(res => console.log(res.genres))
//         .catch(err => console.error(err))
// }
const init = () => {
    fetchAndBuildAllSection()
}
const fetchAndBuildAllSection = async () => {
    try {
        const res = await fetch(apipath.fetchAllCategories)
        const data = await res.json();

        const category = data.genres;
        if (Array.isArray(category) && category.length) {
            category.forEach(category => {
                fetchAndBuildSection(
                    apipath.fetchMoviesList(category.id), category);
            })
        }

    } catch (error) {
        console.error(error)
    }
}
const fetchAndBuildSection = async (fetchUrl, category) => {
    // console.log(fetchUrl, category);
    try {
        const res = await fetch(fetchUrl)
        const data = await res.json();

        const movies = data.results;
        // console.table(movies);
        if (Array.isArray(movies) && movies.length) {
            BuildMovieSection(movies.slice(0, 5), category)

        }
        return movies;
    } catch (error) {
        console.log(error);
    }

}
const BuildMovieSection = (list, categoryName) => {
    console.log(categoryName);
    const moviescont = document.getElementById("movies-cont")
    const moviesListhtml = list.map(item => {
        return `
    

        <figure>
            <img src="${imgPath}${item.backdrop_path}" alt="${item.title}" width="300px">
        </figure>

     

        `
    }).join("");
    // const moviesname = categoryName.map(items => {
    //     return `
    //     <h1>${items.name}<span>Explore All</span></h1>
    //     `
    // }).join("");
    const moviesSectionHtml = `
   
     <h1>${categoryName.name}<span>Explore All</span></h1>
     <div class="mid-container">
    ${moviesListhtml}
    </div>
  
    `

    const div = document.createElement('div')
    div.className = "container"
    div.innerHTML = moviesSectionHtml;
    moviescont.append(div);
    // console.log(movieList);
}
window.addEventListener("load", function () {
    init()
})
let bg = document.getElementById('navbar-bg')
window.addEventListener("scroll", () => {
    if (window.scrollY > 5) {

        bg.classList.add("nav-bg")
    } else {
        bg.classList.remove("nav-bg")
    }
})