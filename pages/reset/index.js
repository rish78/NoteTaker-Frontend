const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
const apiUrl = "https://infinite-coast-54217.herokuapp.com";

// console.log(token);

const reset = document.querySelector(".reset-button");

reset.addEventListener("click", () => {
    const newPassword = document.querySelector(".reset-password").value;
    const retyped = document.querySelector(".retyped-password").value;

    if(newPassword != retyped) {
        Swal.fire({
            icon: 'warning',
            title: 'Passwords don\'t match!',
        })
        return;
    }

    fetch(`${apiUrl}/auth/resetpassword/${token}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        credentials: 'same-origin',
        body: JSON.stringify({newPassword}),
    })
    .then((res) => res.json())
    .then((data) =>{
        if(data.message){
            Swal.fire({
                icon: 'success',
                title: `${data.message}`,
              }).then(() => {
                location.href = "/pages/signup/signup.html";
              })
        }
        else if(data.error){
            Swal.fire({
                icon: 'error',
                text: `${data.error}`,
              })
        }
    })
})