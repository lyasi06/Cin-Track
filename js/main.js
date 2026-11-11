import {getTitles} from "./api.js";
import {modal, closeModal, renderCards, showError} from "./Ui.js";
async function initialis(){
    try{
        allItems = await getTitles();
        showcards(allItems);
        console.log(allItems.length);
    }catch(error){
        showError("Impossible de charger les données. Réessayez plus tard");
        console.log(error.message);
    }
}


let allItems = [];

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
    })
}

document.querySelector("#modal").addEventListener("click", function(event){
    if(event.target.id === "modal"){
        closeModal();
    }
})
initialis();

import {handleFilter} from "./filter.js";
async function update() {
    const result = await handleFilter();
    showcards(result);
}
const searchfilm = document.getElementById("recherch");
const searchSelector = document.getElementById("status");

searchfilm.addEventListener("input", update);
searchSelector.addEventListener("change", update);