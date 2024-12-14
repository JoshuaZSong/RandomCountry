document.addEventListener("DOMContentLoaded", () => {
    fetch("countries.json")
    console.log("parseJson")
    .then(respones => response.json())
    .then(jsonData => parseJson(jsonData))
    .catch(error=>{
        console.log("Error")
    });
})

function parseJson(jsonData){

}
