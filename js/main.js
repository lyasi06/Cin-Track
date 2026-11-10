import {getTitles} from "./api.js";
import {modal, closeModal, renderCards, showError} from "./Ui.js";
async function initialis(){
    try{
        allItems = await getTitles();
        showcards();
        console.log(allItems.length);
    }catch(error){
        showError("Impossible de charger les données. Réessayez plus tard");
        console.log(error.message);
    }
}

let allItems = [];

function showcards(){
    renderCards(allItems);
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(function (card){
        card.addEeventListiner("click", function(){
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
