// const cardData = [
//     { heading: 'heading1', content: 'ahafhdf', id: 1},
//     { heading: 'heading1', content: 'ahafhdf', id: 2},
//     { heading: 'heading1', content: 'ahafhdf', id: 3},
//     { heading: 'heading1', content: 'ahafhdf', id: 4},
//     { heading: 'heading1', content: 'ahafhdf', id: 5},
//     { heading: 'heading1', content: 'ahafhdf', id: 6},
//     { heading: 'heading1', content: 'ahafhdf', id: 7},
// ];


let token = localStorage.getItem("token");


if(!token){
    const urlParams = new URLSearchParams(window.location.search);
    const temptoken = urlParams.get("token");

    localStorage.setItem("token", temptoken);
    token = localStorage.getItem('token');
    location.href="/pages/dashboard/dashboard.html"
}



const apiUrl = "https://infinite-coast-54217.herokuapp.com";

if(!token || token==="null"){ 
    alert("Sign in first!"); 
    location.href = "/pages/signup/signup.html";
}

const cardContainer  = document.querySelector(".card-container");

const createNotes = (array) => {
    array.forEach((cardObj) => {
        const {heading, content, noteId} = cardObj;

        const card = document.createElement("div");
        card.classList.add("card");
        card.id = noteId;
        
        const cardHTML = `<div class="card"><div class="card-header"><div class="card-heading">${heading}</div><div class="heading-buttons"><a href="/pages/update/update.html?noteId=${noteId}"><div class="edit-note"><img src="../../assets/edit.png" alt="edit-note"></div></a><div class="delete-note" id=${noteId}><img src="../../assets/delete.png" alt="delete-note"></div></div></div><div class="card-content">${content}</div></div>`

        card.innerHTML = cardHTML;
        const deleteNote = card.querySelector(".delete-note");
        deleteNote.addEventListener("click", () =>{
            if (confirm('Are you sure you want to delete this note?')) {
                fetch(`${apiUrl}/notes/delete/${noteId}`, 
                {
                    method: 'DELETE',
                    headers : {
                        Authorization:token,
                    },
                    credentials: 'same-origin',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if(data.message) {
                        location.reload();
                    }
                })
            
            } 
        })
        
        cardContainer.appendChild(card);
        
    })
    
}



const logout = document.querySelector(".log-out");

logout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    location.href = "/"
})

const welcome = document.querySelector(".welcome");



window.addEventListener("load", () => {
    if (token) { 
        fetch(`${apiUrl}/notes/getNotes`,
        {
            method: 'GET',
            headers : {
                Authorization:token,
            },
            credentials: 'same-origin',
        })
        .then((res) => res.json())
        .then((data) => {
            const name = data.name;
            welcome.innerHTML = `Welcome ${name}`;
            console.log(data.data);
            data.data.forEach((item) => {
                console.log(item.heading, item.content);
            })
            data.data.sort(function (a, b) {
                return a.noteId - b.noteId;
              });
            createNotes(data.data);
            
        })
        .catch((error) => {
            console.log(error);
        })
    }
})


const createNote = document.querySelector(".new-note");

createNote.addEventListener("click", () => {
    location.href ="/pages/create/create.html";
})



