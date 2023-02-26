function fetchCoctails(searchValue){
    fetch(`${urlSearch}${searchValue}`)//url + búsqueda usuaria
    .then(response => response.json())
    .then(data =>{
        listCocktailsData = data.drinks.map((drink) =>({
            name: drink.strDrink,
            id: drink.idDrink,
            picture: drink.strDrinkThumb,
        }))

        renderListCocktails(listCocktailsData);
    }
    )}

    function renderListCocktails(listCocktailsData){ //Pintar los elementos de la lista en el HTML: dentro del <ul>
        let html = '';
        for (const eachDrink of listCocktailsData){ //q recorra el listado
            let htmlClass= '';
            let img = 'https://via.placeholder.com/140x130';
            if(eachDrink.picture != ''){ //cóctel sin imagen
                img = eachDrink.picture;
            }
            const favorite = listFavCocktailsData.find((favorite) => favorite.id === eachDrink.id);
            if (favorite) {
                htmlClass = 'selected';
            }
            html += `<div><span><li class="js_selection ${htmlClass}" id=${eachDrink.id}>
            <h3 class="name">${eachDrink.name}</h3>
            <img src="${img}" alt="Imagen del cóctel" class="img">
            </li></span></div>`
        }
        listCocktails.innerHTML = html;
        addEventToCoctel();       //añade los eventos a los cócteles
    }

function renderFavListCocktails(listCocktailsData){ //pinta el listado de FAVORITOS en el html
        let html = '';
        let img = 'https://via.placeholder.com/140x130';
        for (const eachDrink of listCocktailsData) { //q recorra el listado
            if(eachDrink.picture != ''){ //cóctel sin imagen
                img = eachDrink.picture;
            }
            html += `<div><span class="close"><i class="fa-regular fa-circle-xmark close_btn js_cross"></i>
            <li class='js_selection' id=${eachDrink.id}>
            <h3 class="name">${eachDrink.name}</h3>
            <img src="${img}" alt="Imagen del cóctel" class="img">
            </li></span></div>`
        }
        listFavCocktails.innerHTML = html;
        addEventToCoctel();       //añade los eventos a los cócteles
    }

    
    //EVENTO: al hacer click se resalta la opción elegida

function handleClick(ev){
    // ev.currentTarget.classList.toggle('selected');//para q le añada o le quite la clase selected
    const idSelected = ev.currentTarget.id;

    document.getElementById(idSelected).classList.toggle('selected');//añade o quita la clase por el id, no donde ocurre el evento, porq si el evento ocurre en fav no va a quitar la selección en renderlist, de esta manera quita la clase a todos los elementos q tengan el id dnd ocurre el evento.
//FAVORITOS
//Buscar por id en el listado de cócteles los q tienen el id con el currentTarget:

//FIND(devuleve el primer objeto q cumpla la condición)
const favCocktails = listCocktailsData.find(eachDrink => eachDrink.id === idSelected);//busca por cada coctel nos quedamos con el q el id currentTarget=id del listado data

const indexCocktail = listFavCocktailsData.findIndex(eachDrink => eachDrink.id === idSelected);//si está en FAv se quite y si no está lo agregue:FINDINDEX:devuelve la posición dnd está el elemento, o -1 sino está
//indexCocktail contiene la posición dnd está la paleta

    if(indexCocktail === -1){//no está en el listado de FAV, entonces PUSH
        listFavCocktailsData.push(favCocktails);//guardar en listado de favoritos:PUSH
    }else{//si está en el listado de FAVs se elimine:SPLICE: elimina un elemento a partir de una posición

        listFavCocktailsData.splice(indexCocktail,1);//a partir de esa posición elimina solo 1
    }
        renderFavListCocktails(listFavCocktailsData);//F q pinta lista FAV
        // renderListCocktails(listCocktailsData);//quita el sombreado eliminando el coctel desde fav
        localStorage.setItem("myfavs", JSON.stringify(listFavCocktailsData));//guarda los datos en LS en el momento q se clica a FAV
}

function addEventToCoctel(){//añade los eventos a los cocteles y se ejecuta dp de q se pinten

    const selectedItems  = document.querySelectorAll('.js_selection');//selecciona todos los <li> q tengan la clase js_selection (selección de la usuaria)

    for (const eachItem of selectedItems) {
        eachItem.addEventListener('click', handleClick);
    }
}

//Búsqueda de otros cócteles
function handleClickBtn(ev){
    ev.preventDefault();
    const searchValue = inputValue.value;

    fetchCoctails(searchValue);
}