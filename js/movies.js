"use strict";

//below is the link to the glitch http site
//https://saber-dear-spoonbill.glitch.me/

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
                <td class="border border_info">${movie.title}</td>
                <td class="border border_info">${movie.director}</td>
                <td class="border border_info">${movie.year}</td>
                <td class="border border_info">
                    <input id="rate" class="edit" type="number" min="1.0" max="10.0" disabled="true" placeholder="${movie.rating}">
                </td>
                <td class="border border_info">
                    <input id="genre-movie" class="edit" type="text" disabled="true" placeholder="${movie.genre}">
                </td>`
            // use if/else statement, if movie image is null then show not found image, else image is found then show original movie poster
            if(movie.img === null)
            {
                tableData += `<td class="border width-100"><img  id="poster" src="https://demofree.sirv.com/nope-not-here.jpg" alt="movie poster"></td>
                               <td class="edit border border_info">
                                   <button data-bs-target="#edit" id="edit-btn" type="button" class="edit">Edit Movie</button>
                                  <span class="invisible">${count++}</span>
                                  <p></p>
                                  <button disabled class="edit" id="save-edit-btn">Save Edit</button>
                                  <p></p>
                                  <button disabled class="edit" id="cancel-btn">Cancel</button>
                               </td>
                     </tr>`
            }
            else
            {
                tableData += `<td class="border width-100"><img  id="poster" src="https://image.tmdb.org/t/p/original${movie.img}" alt="movie poster"></td>
                              <td class="border border_info">
                                  <button data-bs-target="#edit" id="edit-btn" type="button" class="edit">Edit Movie</button>
                                  <span>${count++}</span>
                                  <p></p>
                                  <button disabled class="edit" id="save-edit-btn">Save Edit</button>
                                  <p></p>
                                  <button disabled class="edit" id="cancel-btn">Cancel</button>
                              </td>
                     </tr>`
            }

            // console.log(movie.img);
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
            let stringGenre = "";

            //assign the value in span element to the num
            num = $(this).parent().find('span').text();

            // console.log(num);
            // console.log($('#edit-btn.edit').length);


            //creat an each function for the #edit-btn to disable the edit btn when an edit btn is click to only allow the user to edit one move at a time
            $('#edit-btn.edit').each(function(index, item){

                $('#edit-btn.edit').attr('disabled', true);

            });

            // console.log($(this).parent().find('span').text());

            //assign the objects from the elements of #rate and #genre-movie in the appropriate variables
            let rating = $('#rate.edit');
            let genreInfo = $('#genre-movie.edit')

            // console.log(rating);
            // console.log(genreInfo);

            //assign the values from the current elements of rating and genre in the appropriate variables
            numRating = parseFloat(rating[num].attributes[6].value);
            stringGenre = genreInfo[num].attributes.placeholder.value;

            // console.log(numRating);
            // console.log(stringGenre);

            // console.log(rating[num].attributes[6].value);


            //create an each function for the #rate to enable editing
           $('#rate.edit').each(function(index, item){
               if(index == num)
               {
                   $(this).attr('disabled', false);
               }
           });

           //create an each function for the #genre-movie to enable editing
            $('#genre-movie.edit').each(function(index, item){
                if(index == num)
                {
                    $(this).attr('disabled', false);
                }
            });

            //create an each function for the #save-edit-btn to display the save edit button
            $('#save-edit-btn.edit').each(function(index, item){
                //create variables to hold the rValue and the gValue
                let rValue = "";
                let gValue = "";
                // console.log($('#rate.edit'));

                if(index == num)
                {
                    $(this).attr('disabled', false).on('click', function(){
                        // console.log(numRating);
                        // console.log(stringGenre);

                        // rValue = $('#rate.edit').val();
                        gValue = $('#genre-movie').text();

                        // console.log(rValue.text());
                        // console.log(gValue);

                        //if gValue is not empty then uppercase the first letter of every word
                        if(gValue !== '')
                        {
                            let newString = "";

                            newString = gValue.split(" ");
                            let stringArr = [];

                            //upper case the first letter and rejoin the words
                            stringArr = newString.map(element => {
                                return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
                            });

                            gValue = stringArr.join(" ");
                            // console.log(gValue);
                        }


                        //create an each function to loop through the elements and make sure that the user didn't leave both input fields empty or the rating is less than 1 or grater than 10
                        $('#rate.edit').each(function(index, item){
                            console.log(index);
                            // console.log($(this).val());
                            rValue = $(this).val();

                            // console.log(rValue);

                            // $(this).css('background-color', 'red').val('').attr('placeholder', numRating);
                            if(index == num)
                            {
                                if(rValue === '' && gValue === '')
                                {
                                    // console.log(num);

                                    alert("You did not make any changes to either the rating or the genre section!!!")
                                }
                                // console.log(rValue);
                                else if(rValue < 1 || rValue > 10) {

                                    $(this).css('background-color', 'red').val('').attr('placeholder', numRating);

                                    // rValue = 0.0;

                                    alert('Rating cannot have a input less 1 or greater than 10!!')
                                }
                                else
                                {

                                }

                            }
                        });

                    });
                }
            });

            $('#cancel-btn.edit').each(function(index, item){

                if(index == num)
                {
                    $(this).attr('disabled', false).on('click', function(){
                        loadMovies();
                    })

                }
            });

            // loadMovies();
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

        console.log(data);
        console.log(data.Error);
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
            let tableData = ""
            // logged all movie info to view.
            console.log(movTitle);
            console.log(movDirec);
            console.log(movYear);
            console.log(movRat);
            console.log(movGenre);

            //create a fetch to capture the movie titles and compare it to the movieTitle
            fetch('https://uncovered-real-smartphone.glitch.me//movies').then((data) =>{
            // //json format
            // console.log(data);
                return data.json()
            }).then(data => {

                //create an empty array to store the movie titles
                const movieArr = []

                //use the map function to push the movie title to the movieArr
                data.map(movie => {
                    // console.log(data);

                    movieArr.push(movie.title);
                })

                // console.log(movieArr);

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
                    alert("The movie you are trying to add is already in your list")
                }
                else
                {
                    alert("Adding the movie");


                    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${THE_MOVIE_API_KEY}&query=${movTitle}`).then((data) =>{
                        // //json format
                        // console.log(data);
                        return data.json()
                        }).then(data => {
                            // console.log(data);

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
                }
                console.log(movieAdd);
            }).catch(error => console.error(error));
        }

    }).catch(error => console.error(error));
}

loadMovies();

// connect button functionality on click function using id of btn-submit
$('#btn-submit').on('click', function () {
    // created a variable of searchResults and give it a value of the id of movieInput
    let searchResults = $('#movieInput').val();
    console.log(searchResults);

    //call addMovie function and pass searchResults
    addMovie(searchResults);
});

//created a function to remove the error below the input field once the user starts typing
$('#movieInput').keydown(function () {
    $('#movie-error').text("");
});









