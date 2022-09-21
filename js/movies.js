"use strict";

//below is the link to the glitch http site
//https://saber-dear-spoonbill.glitch.me/

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
    }).then(() => fetch('https://uncovered-real-smartphone.glitch.me/movies').then(resp => resp.json()).then(data => console.log(data)));

}).catch(error => console.error(error));

tableData +=  `<tr>
    <td class="border border_info">${movie.title}</td>
    <td class="border border_info">${movie.director}</td>
    <td class="border border_info">${movie.year}</td>
    <td class="border border_info">${movie.rating}</td>
    <td class="border border_info">${movie.genre}</td>
    <td class="border width-100"><img  id="poster" src="https://image.tmdb.org/t/p/original${movie.img}" alt="movie poster"></td>
             </tr>`
console.log(movie.img);
});
$('tbody').html(tableData);
$('#loading').css('visibility', 'hidden')
}).catch(error => console.error(error));



