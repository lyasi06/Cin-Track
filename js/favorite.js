

//Récupère le tableau des favoris depuis le localStorage.
//Retourne un tableau vide si rien n'est sauvegardé.
export function getFavorites(){
    const saved = localStorage.getItem("favorites");

    if(saved === null){
        return [];
    }
    return JSON.parse(saved);
}

//Vérifie si un item (par son id) est déjà dans les favoris.
//Retourne true / false.
export function isFavorite(id){
    const favs = getFavorites();
    const found = favs.find(function(fav){
        return fav.id === id;
    });
    return found !== undefined;
}

//Ajoute l'item aux favoris s'il n'y est pas,
//le retire s'il y est déjà. (sans doublon)
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

//Retire un favori du localStorage par son id.
//Filtre le tableau pour garder tous les autres.
export function removeFavorite(id){
    const favs = getFavorites();
    const rest = favs.filter(function (fav) {
        return fav.id !== id;
    })
    localStorage.setItem("favorites", JSON.stringify(rest));
}