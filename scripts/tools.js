async function getJSON(path) {
    return fetch(path)
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}