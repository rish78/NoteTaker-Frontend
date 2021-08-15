const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

console.log(noteId);

const apiUrl = "https://infinite-coast-54217.herokuapp.com";
const token = localStorage.getItem("token");
const update = document.querySelector(".create-note-button");
const header = document.querySelector(".create-note-heading");

const contentbox = document.querySelector(".create-note-content");

window.addEventListener("load", () => {
    if(!token){
        alert("Sign In First!");
        location.href = "/pages/signup/signup.html";
    }
    
    fetch(`${apiUrl}/notes/getNote/${noteId}`,
    {
        method: 'GET',
        headers : {
            Authorization:token,
        },
        credentials: 'same-origin',
    })
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        console.log(data.heading);
        
       header.value = data.heading;
       contentbox.value = data.content;
        
    })
})

update.addEventListener("click", (e) => {
    e.preventDefault();

    const heading = header.value;
    const content = contentbox.value;

    fetch(`${apiUrl}/notes/update/${noteId}`, 
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              credentials: 'same-origin',
            body: JSON.stringify({heading, content}),

        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
                location.href = "/pages/dashboard/dashboard.html";
            
            
        })
        .catch((error) =>{
            alert("Note couldn't be updated!");
            console.log(error);
        })

    
})

const logout = document.querySelector(".log-out");

logout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    location.href = "/"
})