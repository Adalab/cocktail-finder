'use strict';

//Variables
const listCocktails = document.querySelector('.js_list-cocktails');//pinta la lista de cóctles en el HTML
const listFavCocktails = document.querySelector('.js_list-cocktails_favorites');
const searchBtn = document.querySelector('.js_btn');
const resetBtn = document.querySelector('.js_reset');
const inputValue = document.querySelector('.js_input');
const urlSearch = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const cocktailStore = JSON.parse(localStorage.getItem("myfavs")); //guardar los datos del LS

let listCocktailsData = [];//lista de cócteles con los DATOS del servidor
let listFavCocktailsData = [];