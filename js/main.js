import {getTitles} from "./api.js";
import {modal, closeModal, renderCards, renderPagination, showError} from "./Ui.js";
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

function showPage(){
    const pageItem = paginate(filteredItems, currentPage);
    showcards(pageItem);
    renderPagination(filteredItems.length, currentPage, goToPage);
}
function goToPage(page){
    currentPage = page;
    showPage();
}
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
        })
    })
}

document.querySelector("#modal").addEventListener("click", function(event){
    
    if(event.target.id === "modal"){
        closeModal();
    }
})
initialis();

import {handleFilter, paginate} from "./filter.js";
async function update() {
    filteredItems = await handleFilter();
    currentPage = 1;
    showPage();
    
}
const searchfilm = document.getElementById("recherch");
const searchSelector = document.getElementById("status");

searchfilm.addEventListener("input", update);
searchSelector.addEventListener("change", update);