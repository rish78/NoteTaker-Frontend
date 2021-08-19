const logout = document.querySelector(".log-out");
const apiUrl = "https://infinite-coast-54217.herokuapp.com";
const token = localStorage.getItem("token");

if(!token) {
    alert("Sign in first!"); 
    location.href = "/pages/signup/signup.html";
}



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
            if(data.message){
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`,
                }).then(() =>{
                    location.href = "/pages/dashboard/dashboard.html";
                })
            }
                
            else if( data.error){
                Swal.fire({
                    icon: 'error',
                    title: `${data.error}`,
                })
            }
    
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Warning!',
                    text: 'Error occured! Note couldn\'t be created',
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