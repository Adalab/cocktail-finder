'use strict';
/*
- Listado de resultados de búsqueda: imagen + nombre
- BTN buscar conectar a la API
- Por cada cóctel del resultado hay q pintar una tarjeta con imagen + nombre
- NO imagen ---> imagen de relleno (placeholder.com)
*/
/**
 * obtener los datos (fetch y lista)
 * pintarlos en el HTML
 *
 */


//Variables
const listCocktails = document.querySelector('.js_list_cocktails'); //listado donde se va a pintar la lista de cócteles en HTML
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini';
let listCocktailsData = []; //lista de cocteles que vienen del servidor


//FETCH
fetch(url)
    .then(response => response.json())
    .then(data =>{
        listCocktailsData = data;

        renderlistCocktails(listCocktailsData.drinks);

})

//Pintar los elementos de la lista en el HTML: dentro del <ul>
//necesito un for porq dentro de cada DRINKS hay otro listado

function renderlistCocktails(coctel){

let html = '';

for (const eachdrink of coctel) {
    html += `<li>
    <h3>${eachdrink.strDrink}</h3>
    <img src="${eachdrink.strDrinkThumb}" alt="imagen del cóctel">
    </li>`
}
listCocktails.innerHTML = html;
}