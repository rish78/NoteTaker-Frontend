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
        

        if(data.error){
            Swal.fire({
                icon: 'error',
                title: `${data.error}`,
            }).then(() => {
                location.href = "/pages/dashboard/dashboard.html";
            })
        }
        
        else{
            header.value = data.heading;
            contentbox.value = data.content;
        }
       
        
    })
    .catch((error) =>{
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Warning!',
            text: 'Internal server error occured. Please try again!',
        })
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
            if(data.message){
                Swal.fire({
                    icon: 'success',
                    title: 'Note updated!',
                }).then(() => {
                    location.href = "/pages/dashboard/dashboard.html";
                })
            }
            else if(data.error){
                Swal.fire({
                    icon: 'error',
                    title: `${data.error}`,
                })
            }

            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Warning!',
                    text: 'Error occured!',
                  })
            }
                
            
            
        })
        .catch((error) =>{
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Warning!',
                text: 'Internal server error occured. Please try again!',
            })
        })

    
})

const logout = document.querySelector(".log-out");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of your account.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then((result) => {
        if (result.isConfirmed){
            localStorage.removeItem("token");
            Swal.fire({
                icon: 'success',
                title: 'User logged out!',
            }).then(() => {
                location.href = "/";
            })
        }
    })
    
    
})