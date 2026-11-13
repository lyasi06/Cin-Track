
//URL de l'API
const url = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";

//Récupère toutes les données depuis l'API.
//Vérifie que la réponse est OK, sinon lève une erreur.
//Retourne le tableau JSON des items.
export async function getTitles() {

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Error API" + response.status);
    }
    const data = await response.json();
    return data;
}
