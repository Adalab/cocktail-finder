function fetchCoctails(searchValue){
    fetch(`${urlSearch}${searchValue}`)//url + búsqueda usuaria
    .then(response => response.json())
    .then(data =>{
        listCocktailsData = data.drinks.map((drink) => ({//datos q vienen de la API con los elementos q se necesitan
            name: drink.strDrink,
            id: drink.idDrink,
            picture: drink.strDrinkThumb,
        }))

        renderListCocktails(listCocktailsData);//dentro, xq fuera no tendría datos, al no existir la lista de datos
    }
    )
}

function renderListCocktails(listCocktailsData){ //Pintar los elementos de la lista en el HTML: dentro del <ul>
    let html = '';
    for (const eachDrink of listCocktailsData){ //q recorra el listado
        let htmlClass= '';
        let img = 'https://via.placeholder.com/140x130';
            if(eachDrink.picture != ''){ //cóctel sin imagen
                //si eachDrink.picture es diferente de vacío, entonces:
            img = eachDrink.picture;
            }
        const favorite = listFavCocktailsData.find((favorite) => favorite.id === eachDrink.id);//busca los id q están en lista de favoritos,
        if (favorite) {//si favorite(id) NO está vacío, existe, entonces se marca como selected
                htmlClass = 'selected';
        }
        html += `<div><span><li class="js_selection ${htmlClass}" id=${eachDrink.id}>
        <h3 class="name">${eachDrink.name}</h3>
        <img src="${img}" alt="Imagen del cóctel" class="img">
        </li></span></div>`
    }
    listCocktails.innerHTML = html;
    addEventToCoctel();       //añade los eventos a los cócteles en el momento q ya hay lista de datos
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


    //EVENTO: al hacer click se resalta la opción elegida con el id, para q cuando se haga click se sepa a cual se está clicando

function handleClick(ev){
    // ev.currentTarget.classList.toggle('selected');//para q le añada o le quite la clase selected
    const idSelected = ev.currentTarget.id;

    document.getElementById(idSelected).classList.toggle('selected');//añade o quita la clase por el id, no donde ocurre el evento, porq si el evento ocurre en fav no va a quitar la selección en renderlist, de esta manera quita la clase a todos los elementos q tengan el id dnd ocurre el evento, xq solo se desmarcaba de render clicando en render y no en favoritos, al tener el mismo id se desactiva en ambos lados

    //FAVORITOS

    //Buscar por id en el listado de cócteles los q tienen el id con el currentTarget:

    //FIND(devuleve el primer objeto q cumpla la condición)
    const favCocktails = listCocktailsData.find(eachDrink => eachDrink.id === idSelected);//busca en renderListCocktails el primer elemento que cumpla la condición: por cada coctel me quedo con el q el "id currentTarget=id del listCocktailsData"

    const indexCocktail = listFavCocktailsData.findIndex(eachDrink => eachDrink.id === idSelected);//comprobar si ya existe el favorito, para q si está en FAv se quite y si no está lo agregue FINDINDEX:devuelve la posición dnd está el elemento, o -1 sino está
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

    const selectedItems = document.querySelectorAll('.js_selection');//selecciona TODOS los <li> q tengan la clase js_selection (selección de la usuaria)

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

//Function RENDERLISTCOCKTAILS con DOM
// ul donde se va a hacer la lista:
const listCocktails = document.querySelector('.js_list-cocktails');


function renderListCocktails(listCocktailsData){ //Pintar los elementos de la lista en el HTML: dentro del <ul>
    let html = '';
    for (const eachDrink of listCocktailsData) {

//crear los elementos
        const imgElement = document.createElement('img');
        const h3Element = document.createElement('h3');
        const name = document.createTextNode(`${eachDrink.name}`);
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        const divElement = document.createElement('div');

//atributos
        imgElement.setAttribute('src', `${img}` || 'https://via.placeholder.com/140x130');
        imgElement.setAttribute('alt', 'Imagen de cócktel');
        imgElement.setAttribute('class', 'img');
        h3Element.setAttribute('class', 'name');
        liElement.setAttribute('class', `js_selection ${htmlClass} id=${eachDrink.id}`)

//padre
        liElement.appendChild(imgElement);
        h3Element.appendChild(name);
        spanElement.appendChild(liElement);
        divElement.appendChild(spanElement);
        listCocktails.appendChild(divElement);
    }
    listCocktails.innerHTML = html;
    addEventToCoctel();       //añade los eventos a los cócteles
}