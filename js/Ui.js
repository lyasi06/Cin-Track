import {isFavorite} from "./favorite.js";

//Convertit le type brut de l'API ("movie"/"serie") en libellé affichable ("Film"/"Serie").
function typeAflam(type) {
    if(type === "movie"){
        return "Film";
    }
    return "Serie";
}
//Génère le HTML d'une card pour un item donné. Affiche le cœur en rouge si l'item est déjà favori.
function createCard(item) {
    let heartColor = "text-white";
    let heartFill = "none";
    if(isFavorite(item.id)){
        heartColor = "text-red-500";
        heartFill = "currentColor";
    }
    return `
    <div class="card bg-zinc-900 text-white rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition" data-id="${item.id}">

      <div class="relative">
        <img src="${item.image}" alt="${item.title}" class="h-72 w-full object-cover">
        <button class="coeur absolute right-2 top-2 rounded-full bg-black/60 p-2 ${heartColor}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="${heartFill}" viewBox="0 0 24 24" stroke = "currentColor" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      <h3 class="font-bold px-3 pt-3">${item.title}</h3>
      <p class="text-sm text-gray-400 px-3 pb-3">${item.releaseYear} • ${typeAflam(item.type)}</p>
    </div>
  `;
}

//Injecte le HTML de toutes les cards dans #list. Affiche un message si aucun résultat.
export function renderCards(items) {
    const element = document.querySelector("#list");
    if(items.length === 0){
        element.innerHTML = `<div class="col-span-full text-center py-12 text-red-500">
                Aucun résultat trouvé.
            </div>`;
        return;
    }

    element.innerHTML = items.map(createCard).join(""); 
}

//Remplit et affiche la modal avec les détails de l'item :
// image, type, année, durée/saisons, genres, description,
// réalisateurs et pays de production.

export function modal(item){
    let extra = "";
    if(item.type === "movie"){
        const h = Math.floor(item.duration / 60);
        let m = item.duration % 60;
        if(m < 10){
            m = "0" + m;
        }
        extra = h + "h " + m + " min";
    }
    else{
        extra = item.seasons.length + " saison(s)";
    }

    const genres = item.genres.map(function(genre) {
        return `<span class="px-3 py-1 text-xs rounded-lg border boreder-zinc-700 text-zinc-300">${genre}</span>`;
    }).join("");

const text = document.querySelector("#modal-content");
text.innerHTML =  `<div class="grid md:grid-cols-2">

        <img src="${item.image}" alt="${item.title}" class="w-full h-72 md:h-full object-cover md:rounded-l-2xl">

        <div class="relative p-8">
            <button id="close-btn" class="absolute top-4 right-4 w-10 h-10 rounded-lg border border-zinc-700 text-xl hover:bg-zinc-800">✕</button>

            <div class="flex items-center gap-3 text-sm text-zinc-400 mt-2">
                <span class="px-2 py-1 text-xs font-bold rounded border border-zinc-600 text-white uppercase">${typeAflam(item.type)}</span>
                <span>${item.releaseYear}</span>
                <span>•</span>
                <span>${extra}</span>
            </div>

            <h2 class="text-4xl font-bold mt-4">${item.title}</h2>

            <div class="flex flex-wrap gap-2 mt-4">${genres}</div>

            <p class="mt-6 text-zinc-400 leading-relaxed">${item.description}</p>

            <hr class="my-6 border-zinc-800">

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-xs tracking-widest text-zinc-500">RÉALISATION</p>
                    <p class="mt-1 font-semibold">${item.directors.join(", ")}</p>
                </div>
                <div>
                    <p class="text-xs tracking-widest text-zinc-500">PAYS DE PRODUCTION</p>
                    <p class="mt-1 font-semibold">${item.productionCountries.join(", ")}</p>
                </div>
            </div>

        </div>
    </div>
  `;
  document.querySelector("#close-btn").addEventListener("click", closeModal);
  document.querySelector("#modal").classList.remove("hidden");
}



//Cache la modal en ajoutant la classe "hidden".
export function closeModal(){
    document.querySelector("#modal").classList.add("hidden");
}


//Affiche un message d'erreur dans #error.

export function showError(message){
    const error = document.querySelector("#error");
    error.textContent = message;
    error.classList.remove("hidden");
}

//Génère les boutons de pagination.
// - 8 items par page
// - Met en rouge le bouton de la page actuelle
// - Appelle onPageChange(page) au clic
export function renderPagination(total, currentPage, onPageChange){
    console.log(total)
    const box = document.querySelector("#pagination");
    box.innerHTML = "";

    const totalPages = Math.ceil(total / 8);
    if(totalPages <= 1){
        return
    }
    for(let page = 1; page <= totalPages; page++){
        const btn = document.createElement("button");
        btn.textContent = page;
       if(page === currentPage){
    btn.className = "px-4 py-2 rounded-lg bg-red-600 text-white font-semibold";
       }
       else{
        btn.className = "px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-red-600 hover:text-white transition";
       }
        btn.addEventListener("click", function(){
            onPageChange(page);
    });
    box.appendChild(btn);
}
}


//Affiche les favoris dans la sidebar avec :
// - un compteur films / séries
// - une liste avec image, titre, année, type
// - un bouton ✕ pour retirer chaque favori
export function renderFavorites(favorites, onRemove){
    const list = document.querySelector("#fav-list");

    if(favorites.length === 0){
        list.innerHTML = `<p class="text-slate-400 text-sm">Aucun favori pour le moment.</p>`;
        return;
    }

    let countFilm = 0;
    let countSerie = 0;
    favorites.forEach(function(fav){
        if(fav.type === "movie"){
            countFilm++;
        } else {
            countSerie++;
        }
    });
    
    list.innerHTML = `<div class="col-span-full mb-2 text-sm text-slate-300">
            Films: <span class="font-bold text-red-500">${countFilm}</span> • 
            Séries: <span class="font-bold text-red-500">${countSerie}</span>
        </div>`
        
        +favorites.map(function (fav){
        return `<div class="flex items-center gap-3 bg-slate-700 rounded-lg p-2">
            <img src="${fav.image}" alt="${fav.title}" class="w-12 h-16 object-cover rounded">
            <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">${fav.title}</p>
                <p class="text-xs text-slate-400">${fav.releaseYear} • ${typeAflam(fav.type)}</p>
            </div>
            <button class="remove-btn w-8 h-8 rounded hover:bg-slate-600" data-id="${fav.id}">✕</button>
        </div>`;
    }).join("");

    const buttons = document.querySelectorAll(".remove-btn");
    buttons.forEach(function (btn){
        btn.addEventListener("click", function(){
            onRemove(btn.dataset.id);
        });
    });
}