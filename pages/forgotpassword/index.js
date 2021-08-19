const sendEmail = document.querySelector(".send-button");
const apiUrl = "https://infinite-coast-54217.herokuapp.com"

sendEmail.addEventListener("click", ()=> {
    const email = document.querySelector(".reset-email").value;
    
    fetch(`${apiUrl}/auth/forgotpassword`,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          credentials: 'same-origin',
        body: JSON.stringify({email}),
    })
    .then((res) => res.json())
    .then((data) =>{
        console.log(data);
        if(data.message){
            Swal.fire({
                icon: 'success',
                title: `${data.message}`,
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
                text: 'Error occured!',
              })
        }
    })
    .catch((err) =>{
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Warning!',
            text: 'Internal server error occured. Please try again!',
        })
    })
})