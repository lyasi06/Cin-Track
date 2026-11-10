function typeAflam(type) {
    if(type === "movie"){
        return "Film";
    }
    return "Serie";
}

function createCard(item) {
    return `<div class="card bg-zinc-900 text-white rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="w-full h-64 object-cover">
      <h3 class="font-bold px-3 pt-3">${item.title}</h3>
      <p class="text-sm text-gray-400 px-3 pb-3">${item.releaseYear} • ${typeAflam(item.type)}</p>
    </div>
  `;
}
export function renderCards(items) {
    const element = document.querySelector("#list");
    element.innerHTML = items.map(createCard).join(""); 
}

export function modal(item){
    const khawi = "";
    if(item.type === "movie"){
        khawi = "Duree :" + item.duration + "min";
    }
    else{
        khawi = "Saisons : " + item.seasons.length;
    }

const text = document.querySelector("modal");
text.innerHTML =  `<button id="close-btn" class="text-2xl hover:text-red-500">✕</button>
    <img src="${item.image}" alt="${item.title}" class="w-full h-96 object-contain mb-4">
    <h2 class="text-3xl font-bold mb-3">${item.title}</h2>
    <p class="mt-2">Type : ${getTypeLabel(item.type)}</p>
    <p class="mt-2">Année : ${item.releaseYear}</p>
    <p class="mt-2">${extra}</p>
    <p class="mt-2">Genres : ${item.genres.join(", ")}</p>
    <p class="mt-2">Réalisateurs : ${item.directors.join(", ")}</p>
    <p class="mt-2">Pays : ${item.productionCountries.join(", ")}</p>
    <p class="mt-4 text-gray-300">${item.description}</p>
  `;
  document.querySelector("#close-btn").addEventListener("click", closeModal);
  document.querySelector("#modal").classList.remove("hidden");
}

export function closeModal(){
    document.querySelector("#modal").classList.add("hidden");
}

export function showError(message){
    const error = document.querySelector("#error");
    error.textContent = message;
    error.classList.remove("hidden");
}