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
        alert(data.message);
    })
    .catch((err) =>{
        console.log(err);
    })
})