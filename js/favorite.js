
export function getFavorites(){
    const saved = localStorage.getItem("favorites");

    if(saved === null){
        return [];
    }
    return JSON.parse(saved);
}


export function isFavorite(id){
    const favs = getFavorites();
    const found = favs.find(function(fav){
        return fav.id === id;
    });
    return found !== undefined;
}

export function toggleFavorite(item){
    if(isFavorite(item.id)){
        removeFavorite(item.id);
    }
    else{
        const favs = getFavorites();
        favs.push(item);
        localStorage.setItem("favorites", JSON.stringify(favs));
    }
}

export function removeFavorite(id){
    const favs = getFavorites();
    const rest = favs.filter(function (fav) {
        return fav.id !== id;
    })
    localStorage.setItem("favorites", JSON.stringify(rest));
}