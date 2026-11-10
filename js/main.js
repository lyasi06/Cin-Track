import {getTitles} from "./api.js";


async function initialis(){
    try{
        const items = await getTitles();
        console.log(items);
        console.log(items.length);
    }catch(error){
        console.log(error.message);
    }
}
initialis();