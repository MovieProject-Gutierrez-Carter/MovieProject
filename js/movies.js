"use strict";

//below is the link to the glitch http site
//https://uncovered-real-smartphone.glitch.me/

function loadMovies()
{
    fetch('https://uncovered-real-smartphone.glitch.me//movies').then((data) =>{
        // //json format
        // console.log(data);
        return data.json()
    }).then(data => {

        // console.log(data);
        let tableData = "";
        let count = 0;
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
                <td id="movie-id" class="edit border border_info invisible">${movie.id}</td>
                <td class="border border_info">${movie.title}</td>
                <td class="border border_info">${movie.director}</td>
                <td class="border border_info">${movie.year}</td>
                <td id="movie-rating" class="edit border border_info">${movie.rating}</td>
                <td id="movie-genre" class="edit border border_info">${movie.genre}</td>`

            // use if/else statement, if movie image is null then show not found image, else image is found then show original movie poster
            if(movie.img === null)
            {
                tableData += `<td class="border width-100"><img  id="poster" src="https://demofree.sirv.com/nope-not-here.jpg" alt="movie poster"></td>
                               <td class="border border_info py-4" id="edit-field">
                                   <button id="edit-btn" type="button" class="edit">Edit Movie</button>
                                  <p></p>
                                  <button disabled class="edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#save-edit-movie-modal" id="save-edit-btn" type="button">Save Edit</button>
                                  <p></p>
                                  <button disabled class="edit btn btn-dark" id="cancel-btn" type="button">Cancel</button>
                                  <p></p>
                                  <button disabled class="edit btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-movie-modal" id="delete-btn">Delete</button>
                               </td>
                     </tr>`
            }
            else
            {
                tableData += `<td class="border width-100"><img  id="poster" src="https://image.tmdb.org/t/p/original${movie.img}" alt="movie poster"></td>
                              <td class="border border_info py-4" id="edit-field">
                                  <button id="edit-btn" type="button" class="edit">Edit Movie</button>
                                  <p></p>
                                  <button disabled class="edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#save-edit-movie-modal" id="save-edit-btn" type="button">Save Edit</button>
                                  <p></p>
                                  <button disabled class="edit btn btn-dark" id="cancel-btn" type="button">Cancel</button>
                                  <p></p>
                                  <button disabled class="edit btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-movie-modal" id="delete-btn">Delete</button>
                              </td>
                     </tr>`
            }
        });
        // use tbody element in html with value of tableData
        // show loading spinner with id of loading with css styling
        // use catch error function and log error
        $('tbody').html(tableData);
        $('#loading').css('visibility', 'hidden')

        //added a btn on click function for #edit-btn to pop up a dialog box to update movie information
        $('#edit-btn.edit').on('click', function(){

            //create variables to store movie data for editing
            let num = 0;
            let numRating = 0.0;
            let movieID = 0;
            let stringGenre = "";
            let ratingValue = "";
            let genreValue = "";

            //disable all edit buttons
            $('#edit-btn.edit').attr('disabled', true);

            //enable the save-edit, cancel, and delete buttons
            $(this).parent().parent().children()[7].children[2].disabled = false;
            $(this).parent().parent().children()[7].children[4].disabled = false;
            $(this).parent().parent().children()[7].children[6].disabled = false;

            //assign the proper data from the table onto the variables
            movieID = $(this).parent().parent().children()[0].textContent;
            numRating = $(this).parent().parent().children()[4].textContent;
            stringGenre = $(this).parent().parent().children()[5].textContent;

            //remove the text value and insert an input tag for the rating field being edited
            $('#movie-rating.edit').each(function(index, item){

                if($(this).parent().children()[0].textContent === movieID)
                {
                    $(this).text('');
                    $(this).html(`<input id="rating" class="edit" type="number" min="1.0" max="10.0" placeholder="${numRating}">`)
                }
            })

            //insert the rating value and allow the user to update if needed
            $('#rating').each(function(index, input){
                $(this).val(parseFloat((numRating)));
            });

            //remove the text value and insert an input tag for the genre field being edited
            $('#movie-genre.edit').each(function(index, item){

                // console.log(item);

                if($(this).parent().children()[0].textContent === movieID)
                {
                    $(this).text('');
                    $(this).html(`<input id="genre-movie" class="edit" type="text" placeholder="${stringGenre}">`)
                }
            })

            //insert the genre value and allow the user to update if needed
            $('#genre-movie').each(function(index, input){

                $(this).val((stringGenre));
            });

            //if the user clicks the save button capture the rating and the genre information and passed them through conditions for validation
            $('#save-edit-btn.edit').on('click', function(){

                //assign the rating value to ratingValue
                $('#rating').each(function(index, input){

                    ratingValue = $(this).val();
                    console.log(ratingValue);
                });

                //assign the genre value to genreValue
                $('#genre-movie').each(function(index, input){

                    genreValue =  $(this).val();
                    console.log(genreValue);
                });

                //check if both the rating and the genre field are empty, if they are let the user know that both of those fields cannot be left empty
                if(ratingValue === '' && genreValue === '')
                {
                    $('#rating.edit').each(function(index, item){

                            $(this).val(numRating);
                    });

                    $('#genre-movie.edit').each(function(index, item){

                            $(this).val(stringGenre);
                    });

                    $('#save-edit-error').text("You did not make any changes to either the rating or the genre section!!!");
                }
                //display a message to the user if the genre field is empty
                else if(genreValue === "")
                {
                    $('#genre-movie.edit').each(function(index, item){

                            $(this).val(stringGenre);
                    });

                    $('#save-edit-error').text("You cannot have the genre section empty, please try again!!!");

                }
                //display a message to the user if rating is empty, or if it is less than 1 and grater than 10
                else if(ratingValue < 1 || ratingValue > 10)
                {
                    $('#rating.edit').each(function(index, item){

                            $(this).val(numRating);
                    });

                    $('#save-edit-error').text('Rating cannot have ainput less 1 or greater than 10!!');
                }
                else
                {
                    //create an empty string and empty array variables to fix the uppercase of any words being passed to the genre list
                    let newString = "";
                    let stringArr = [];

                    //split genreValue and assign it to newString
                    newString = genreValue.split(" ");


                    //upper case the first letter
                    stringArr = newString.map(element => {
                        return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
                    });

                    //rejoin the words
                    genreValue = stringArr.join(" ");

                    // insert the rating value
                    $('#movie-rating.edit').each(function(index, input){

                        if($(this).parent().children()[0].textContent === movieID)
                        {
                            $(this).text(ratingValue);
                        }
                    });

                    // insert the genre value
                    $('#movie-genre.edit').each(function(index, input){

                        if($(this).parent().children()[0].textContent === movieID)
                        {
                            $(this).text(genreValue);
                        }
                    });

                    // create a variable to edith the rating and genre fields in our glitch server
                    const editMovie = {
                        "rating": ratingValue,
                        "genre": genreValue
                    };

                    //update data
                    fetch(`https://uncovered-real-smartphone.glitch.me/movies/${movieID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editMovie),
                    }).then(() => fetch('https://uncovered-real-smartphone.glitch.me/movies').then(resp => resp.json()).then(data =>{
                        // console.log(data)
                    })).then(() => loadMovies()).catch(error => console.error(error));

                    $('#save-edit-error').text('The movie was edited, and saved!!');
                }

            });

            //call the loadMovies function when the cancel btn is clicked
            $('#cancel-btn.edit').on('click', function(){
                loadMovies();
            });

            $('#delete-btn.edit').on('click', function(){

                //proceed to delete the movie if the user clicks delete
                $('#movie-delete-btn').on('click', function(){

                    //create a fetch delete to remove movie from the list
                    fetch(`https://uncovered-real-smartphone.glitch.me/movies/${movieID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(() => fetch('https://uncovered-real-smartphone.glitch.me/movies').then(resp => resp.json()).then(data =>{
                        // console.log(data)
                    })).then(() => loadMovies()).catch(error => console.error(error));
                });
            });
        });

        $('#sortTable').DataTable({
            paging: false,
            // ordering: false,
            info: false,
            // dDestroy: true
        });
    }).catch(error => console.error(error));

}

// created a function of addMovie that has a parameter of title then fetch the title and the api, returned data with json, logged data.
function addMovie(title)
{
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=${MOVIE_API_KEY}`).then((data) => {
        // console.log(data);
        return data.json()

    }).then(data => {
        // created an if/else statement, then query id of movie-error, on click of the submit button will change the text.
        if(data.Error === 'Movie not found!')
        {
            $('#movie-error').text(data.Error);
            $('#movieInput').val('');
        }
        else if(title === '')
        {
            $('#movie-error').text('You left your title search empty, please enter a movie to try again');
            $('#movieInput').val('');
        }
        else
        {
            console.log(data.Title);
            let movTitle = data.Title;
            let movDirec = data.Director;
            let movYear = data.Year;
            let movRat = data.imdbRating;
            let movGenre = data.Genre;

            //create a fetch to capture the movie titles and compare it to the movieTitle
            fetch('https://uncovered-real-smartphone.glitch.me//movies').then((data) =>{
            // //json format
                return data.json()
            }).then(data => {

                //create an empty array to store the movie titles
                const movieArr = []

                //use the map function to push the movie title to the movieArr
                data.map(movie => {
                    // console.log(data);

                    movieArr.push(movie.title);
                });

                //create a variable to check if the movie is already in our list
                let movieAdd = false;

                //create a for of function to go through the movieArr and compare it to the movieTitle
                for(let list of movieArr)
                {
                    if(list === movTitle)
                    {
                        movieAdd = false;
                        break;
                    }
                    else
                    {
                        movieAdd = true;
                    }
                }
                // another if/else statement showing if movie title is found then it can't be added and shows an alert, or if it's not found then we can add the movie with an alert.

                if(movieAdd === false)
                {
                    $('#movie-error').text("The movie you are trying to add is already in your list");
                    $('#movieInput').val('');
                }
                else
                {
                    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${THE_MOVIE_API_KEY}&query=${movTitle}`).then((data) =>{
                        // //json format
                        // console.log(data);
                        return data.json()
                        }).then(data => {

                            //create a variable to add the movie fields in our glitch server
                            const addMovieInfo = {
                                "title": movTitle,
                                "director": movDirec,
                                "rating": movRat,
                                "genre": movGenre,
                                "year": movYear,
                                "img": data.results[0].poster_path
                            };

                            //update data
                            fetch(`https://uncovered-real-smartphone.glitch.me/movies`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(addMovieInfo),

                            }).then(() => loadMovies()).catch(error => console.error(error));

                        }).catch(error => console.error(error));

                    $('#movie-error').text("Your movie was add, you may add another movie or click the cancel button to exit!!");
                    $('#movieInput').val('');
                }
            }).catch(error => console.error(error));
        }

    }).catch(error => console.error(error));
};

loadMovies();

// connect button functionality on click function using id of btn-submit
$('#btn-submit').on('click', function () {
    // created a variable of searchResults and give it a value of the id of movieInput
    let movieTitle = $('#movieInput').val();

    //call addMovie function and pass searchResults
    addMovie(movieTitle);
});

//created a function to remove the error below the input field once the user starts typing
$('#movieInput').keydown(function () {
    $('#movie-error').text("");
});









