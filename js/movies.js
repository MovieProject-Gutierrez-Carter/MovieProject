"use strict";

//below is the link to the glitch http site
//https://saber-dear-spoonbill.glitch.me/
// const books = fetch('https://saber-dear-spoonbill.glitch.me/books').then(resp => resp.json()).then(data => test = data);

// const Url = 'https://saber-dear-spoonbill.glitch.me/books';
// $.ajax({
//     url: Url,
//     type:'GET',
//     success: function(result) {
//         console.log(result)
//     },
//     .catch function (error) {
//        console.log(`Error ${error}`)
//     }
// })

// let test = "";
// const books = () => {
//     fetch('https://saber-dear-spoonbill.glitch.me/books').then(resp => resp.json()).then(data => {
//         console.log(data[0].title);
//         test = data[0].title;
//         return data;
//
//     })
// };
//
// books();

const getMyMovies = async()=>{
    try {
        const res = await fetch("https://saber-dear-spoonbill.glitch.me/books")
        const data = await res.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log("Error Occurred :(", e);
    }
};
console.log(getMyMovies);

// let test = books();

// console.log(test);


// console.log(books);

// const book = books.filter(book => book.title);
// console.log(book.title);
// function showBooks()
// {
//     let html = "";
//
//     html += `<td id="title"></td>
//              <td id="author"></td>`
// }

// let getBook = {};
//
// fetch("https://saber-dear-spoonbill.glitch.me/books", {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(getBook),
// }).then(() => fetch("https://saber-dear-spoonbill.glitch.me/books")).then(resp => resp.json()).then(data => console.log(data));

// fetch(`https://pokeapi.co/api/v2/pokemon/${val}`)
//         .then(resp => resp.json())
//         .then(pokemon => {
//             if (pokemon.types.length > 1) {
//                 let types = pokemon.types.reduce((finalStr, typeObj) => {
//                     if (finalStr === "") {
//                         return typeObj.type.name;
//                     } else {
//                         return `${finalStr}/${typeObj.type.name}`;
//                     }
//                 }, "");
//                 console.log(types)
//             } else {
//                 console.log(pokemon.types[0].type.name);
//             }
//             console.log(pokemon.species.name);
//             console.log(pokemon);