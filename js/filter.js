// import {handleFilter} from "./main.js";
import {getTitles} from "./api.js";

export async function handleFilter(){
    const types = await getTitles();
    const searchfilm = document.getElementById("recherch");
    const searchSelector = document.getElementById("status");

    const film = searchfilm.value.toLocaleLowerCase().trim();
    const status = searchSelector.value
    console.log(film, status);
    const filterfilm = types.filter((type) =>{
        const matchFilm = film === "" || type.title.toLocaleLowerCase().includes(film);

        let matchFilter = false;

        if(status === "tous"){
            matchFilter = true;
        }
        else if (status === "film") {
            matchFilter = type.type === "movie"
        }
        else if(status === "series"){
            matchFilter = type.type === "series"
        }
        return matchFilm && matchFilter;
    })
    return filterfilm;
}