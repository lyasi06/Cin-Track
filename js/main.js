
//IMPORTS
import {getTitles} from "./API.js";
import {modal, closeModal, renderCards, renderPagination, renderFavorites, showError} from "./Ui.js";
import { getFavorites, toggleFavorite, removeFavorite } from "./favorite.js";

//Point d'entrée. Récupère les données de l'API, lance le premier affichage, et gère les erreurs.
async function initialis(){
    try{
        allItems = await getTitles();
        // showcards(allItems);
        update();
        console.log(allItems.length);
    }catch(error){
        showError("Impossible de charger les données. Réessayez plus tard");
        console.log(error.message);
    }
}


let allItems = [];
let filteredItems =[]
let currentPage = 1;
//Affiche la page courante (8 items) et génère les boutons de pagination correspondants.
function showPage(){
    const pageItem = paginate(filteredItems, currentPage);
    showcards(pageItem);
    renderPagination(filteredItems.length, currentPage, goToPage);
}

//Callback appelée quand l'utilisateur clique sur un numéro de page. Met à jour currentPage puis réaffiche la page.
function goToPage(page){
    currentPage = page;
    showPage();
}
//Récupère les favoris depuis le localStorage et les affiche dans la sidebar.
function showFavorites(){
    renderFavorites(getFavorites(), handleRemove);
}

//Callback appelée quand on clique sur ✕ d'un favori.Supprime le favori, puis rafraîchit la page et la sidebar.
function handleRemove(id){
    removeFavorite(id);
    showPage();          
    showFavorites();
}
//Affiche les cards dans le DOM, puis attache les événements sur chaque card

function showcards(items){
    renderCards(items);
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(function (card){
        card.addEventListener("click", function(){
            const id = card.dataset.id;
            const item = allItems.find(function (i){
                return i.id === id;
            })
            modal(item);
        })
        const heart = card.querySelector(".coeur");
        heart.addEventListener("click", function (event) {
            event.stopPropagation();
            const id = card.dataset.id;
            const item = allItems.find(function(i){
                return i.id === id;
            })
            toggleFavorite(item);
            showPage();
            showFavorites();
        })
    })
}

document.querySelector("#modal").addEventListener("click", function(event){
    
    if(event.target.id === "modal"){
        closeModal();
    }
})
initialis();
showFavorites();

import {handleFilter, paginate} from "./filter.js";

//Applique la recherche + le filtre (via handleFilter),remet la page à 1, puis affiche la page.
// Appelée à chaque changement de recherche ou de filtre.
async function update() {
    filteredItems = await handleFilter();
    currentPage = 1;
    showPage();
    
}
const searchfilm = document.getElementById("recherch");
const searchSelector = document.getElementById("status");

searchfilm.addEventListener("input", update);
searchSelector.addEventListener("change", update);