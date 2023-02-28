//Buscar en el LS, para no tener q volver a hacer la petición a la API

if (cocktailStore){//const q guarda los datos almacenados en LS
    listFavCocktailsData = cocktailStore;
renderFavListCocktails(listFavCocktailsData);//si está vacío es xq fav tb lo está
}

fetchCoctails("martini");//para q al resetear la lista q se cargue sea la de martini q es la default

searchBtn.addEventListener('click', handleClickBtn);//evento de búsqueda de otros cócteles al pulsar buscar

//si cocktailStore NO está vacío(no es null)(si existe/si tiene un valor), que cargue la lista de favoritos y renderizarlos