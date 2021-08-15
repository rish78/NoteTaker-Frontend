const logout = document.querySelector(".log-out");
const apiUrl = "https://infinite-coast-54217.herokuapp.com";
const token = localStorage.getItem("token");

if(!token) {
    alert("Sign in first!"); 
    location.href = "/pages/signup/signup.html";
}

logout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    location.href = "/"
})

const create = document.querySelector(".create-note-button");

create.addEventListener("click", (e) => {
    e.preventDefault();

    const heading = document.querySelector(".create-note-heading").value;
    const content = document.querySelector(".create-note-content").value;

    fetch(`${apiUrl}/notes/add`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              credentials: 'same-origin',
            body: JSON.stringify({heading, content}),

        })
        .then((res) => res.json())
        .then((data) =>{
                location.href = "/pages/dashboard/dashboard.html";
            
            
        })
        .catch((error) =>{
            alert("Note couldn't be created!");
            console.log(error);
        })

    
})