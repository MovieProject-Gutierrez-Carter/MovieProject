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

tableData +=  `<tr>
    <td class="border border_info">${movie.title}</td>
    <td class="border border_info">${movie.director}</td>
    <td class="border border_info">${movie.year}</td>
    <td class="border border_info">${movie.rating}</td>
    <td class="border border_info">${movie.genre}</td>
    <td class="border width-100"><img  id="poster" src="https://image.tmdb.org/t/p/original${movie.img}" alt="movie poster"></td>
             </tr>`
// console.log(movie.img);
});
$('tbody').html(tableData);
$('#loading').css('visibility', 'hidden')
}).catch(error => console.error(error));

$('#btn-submit').on('click', function () {
    // // created variables to store the input fields submitted by the user
    // let rating = $('#movieRate').val();
    // let year = $('#movieYear').val();
    // let genre = $('select option').each(function () {
    //     $(this).val();
    // });
    // // console.log(genre);
    // // console.log(rating);
    //
    // //create a condition to capture any errors in the input fields, also to clear out the input fields if incorrect
    //
    // if(rating === "" && year === "")
    // {
    //     $('#movieRate').val('');
    //     $('#movieYear').val('');
    //     alert(`If you typed e on the year field and on the rating field and submitted, e is not a number, please try again`);
    // }
    // else if(rating === "")
    // {
    //     $('#movieRate').val('');
    //     alert(`If you typed e on the rating field and submitted, e is not a number, please try again`);
    // }
    // else if(rating < 1 || rating > 10)
    // {
    //     $('#movieRate').val("");
    //     alert(`If you typed a number less than 1 or a number higher than 10, please try again`);
    // }
    // else if(year === '')
    // {
    //     $('#movieYear').val('');
    //
    //     alert(`If you typed e on the year field and submitted, e is not a number, please try again`);
    // }
    // else if(year < 1888 || year > 2022)
    // {
    //     $('#movieYear').val('');
    //     alert('year is too low or too high')
    // }
    // else
    // {
    //
    // }
    let searchResults = $('#movieInput').val();
    console.log(searchResults);

    searchMovie(searchResults);

    // fetch(`https://www.omdbapi.com/?t=jhgjhghj&apikey=${MOVIE_API_KEY}`).then((data) => {
    //     console.log(data);
    //     return data.json()
    //
    // }).then(data => {
    //     console.log(data);
    //     console.log(data.Error);
    //
    //     if(data.Error === 'Movie not found!')
    //     {
    //         $('#movie-error').text(data.Error);
    //     }
    //
    //
    //
    // })

});









