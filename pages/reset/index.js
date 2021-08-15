const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
const apiUrl = "https://infinite-coast-54217.herokuapp.com";

console.log(token);

const reset = document.querySelector(".reset-button");

reset.addEventListener("click", () => {
    const newPassword = document.querySelector(".reset-password").value;
    const retyped = document.querySelector(".retyped-password").value;

    if(newPassword != retyped) {
        alert("Passwords don't match");
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
        console.log(data);
    })
})