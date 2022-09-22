"use strict";

//below is the link to the glitch http site
//https://saber-dear-spoonbill.glitch.me/

// created a function of searchMovie that has a parameter of title then fetch the title and the api, returned data with json, logged data.
function searchMovie(title)
{
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=${MOVIE_API_KEY}`).then((data) => {
        // console.log(data);
        return data.json()

    }).then(data => {
        console.log(data);
        console.log(data.Error);
        // created an if/else statement, then query id of movie-error, on click of the submit button will change the text.
        if(data.Error === 'Movie not found!')
        {
            $('#movie-error').text(data.Error);
        }
        else
        {
            $('#movie-error').text("Correct");
            let movTitle = data.Title;
            let movDirec = data.Director;
            let movYear = data.Year;
            let movRat = data.imdbRating;
            let movGenre = data.Genre;
            // logged all movie info to view.
            console.log(movTitle);
            console.log(movDirec);
            console.log(movYear);
            console.log(movRat);
            console.log(movGenre);
        }

    })
}

fetch('https://uncovered-real-smartphone.glitch.me//movies').then((data) =>{
// //json format
// console.log(data);
return data.json()
}).then(data => {

    // console.log(data);
    let tableData = "";
    data.map(movie => {
        let img = "";

        //create a fetch call to themoviedb.org api to capture the poster path
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${THE_MOVIE_API_KEY}&query=${movie.title}`).then((data) =>{
        // //json format
        // console.log(data);
        return data.json()
        }).then(data => {
            // console.log(data);

            //create a variable to edith the img field in our glitch server
        const editImg = {
            "img": data.results[0].poster_path
        };

        //update data
        fetch(`https://uncovered-real-smartphone.glitch.me/movies/${movie.id}`, {
        method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editImg),
        }).then(() => fetch('https://uncovered-real-smartphone.glitch.me/movies').then(resp => resp.json()).then(data =>{
        // console.log(data)
        }));

        }).catch(error => console.error(error));

        // set html elements along with movie data to tableData
        tableData +=  `<tr>
            <td class="border border_info">${movie.title}</td>
            <td class="border border_info">${movie.director}</td>
            <td class="border border_info">${movie.year}</td>
            <td class="border border_info">${movie.rating}</td>
            <td class="border border_info">${movie.genre}</td>`
        // use if/else statement, if movie image is null then show not found image, else image is found then show original movie poster
            if(movie.img === null)
        {
            tableData += `<td class="border width-100"><img  id="poster" src="https://demofree.sirv.com/nope-not-here.jpg" alt="movie poster"></td>
                 </tr>`
        }
        else
        {
            tableData += `<td class="border width-100"><img  id="poster" src="https://image.tmdb.org/t/p/original${movie.img}" alt="movie poster"></td>
                 </tr>`
        }

    // console.log(movie.img);
    });
    // use tbody element in html with value of tableData
    // show loading spinner with id of loading with css styling
    // use catch error function and log error
    $('tbody').html(tableData);
    $('#loading').css('visibility', 'hidden')
}).catch(error => console.error(error));

// connect button functionality on click function using id of btn-submit
$('#btn-submit').on('click', function () {
    // created a variable of searchResults and give it a value of the id of movieInput
    let searchResults = $('#movieInput').val();
    console.log(searchResults);

    //call searchMovie function and pass searchResults
    searchMovie(searchResults);
});









