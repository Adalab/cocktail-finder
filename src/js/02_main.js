
if (cocktailStore){
    listFavCocktailsData = cocktailStore;
renderFavListCocktails(listFavCocktailsData);
}

fetchCoctails("martini");//para q al renderizar la lista q se cargue sea la de martini q es la default

searchBtn.addEventListener('click', handleClickBtn);

//si cocktailStore NO está vacío(no es null)(si existe), que cargue la lista de favoritos y renderizarlos