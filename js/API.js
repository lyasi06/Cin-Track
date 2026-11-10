const url = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";

export async function getTitles() {

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Error API" + response.status);
    }
    const data = await response.json();
    return data;
}
