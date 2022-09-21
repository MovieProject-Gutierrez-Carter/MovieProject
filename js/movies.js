"use strict";

//below is the link to the glitch http site
//https://saber-dear-spoonbill.glitch.me/

fetch('https://saber-dear-spoonbill.glitch.me/books').then((data) =>{
    // //json format
    // console.log(data);
    return data.json()
}).then(data => {
    console.log(data[0].author);
    let tableData = "";
    data.map(book => {
        console.log(book.title.includes("Dune"));
        // //This can be used when we need to filter through genre
        // if(book.title.includes("Dune"))
        // {
        //     tableData += ` <tr>
        //                     <td>${book.title}</td>
        //                     <td>${book.author}</td>
        //                </tr>`
        // }

        tableData += ` <tr>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                       </tr>`
    });
    $('tbody').html(tableData);
});