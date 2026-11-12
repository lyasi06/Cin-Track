function typeAflam(type) {
    if(type === "movie"){
        return "Film";
    }
    return "Serie";
}

function createCard(item) {
    return `
    <div class="card bg-zinc-900 text-white rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition" data-id="${item.id}">

      <div class="relative">
        <img src="${item.image}" alt="${item.title}" class="h-72 w-full object-cover">
        <button class="coeur absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

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

export function closeModal(){
    document.querySelector("#modal").classList.add("hidden");
}

export function showError(message){
    const error = document.querySelector("#error");
    error.textContent = message;
    error.classList.remove("hidden");
}


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