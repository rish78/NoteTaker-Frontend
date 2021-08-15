const apiUrl = "https://infinite-coast-54217.herokuapp.com";
console.log(apiUrl);
window.addEventListener("load", ()=> {
    console.log("load");
    fetch(`${apiUrl}/auth/google/redirect`,{
        method: 'GET',
    })
    .then((data) =>{
        console.log(data);

    })

})