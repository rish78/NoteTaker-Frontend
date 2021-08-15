const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");
const googleLogin = document.querySelector(".login-with-google-btn");

const apiUrl = "https://infinite-coast-54217.herokuapp.com";
const token = localStorage.getItem("token");
console.log(token);
if (token && token!="null"){
    location.href = "../dashboard/dashboard.html";
}

googleLogin.addEventListener("click", () => {
    fetch(`${apiUrl}/auth/google`,{
        method: 'GET',
    })
    
    .then((res) =>{
        console.log(res);
        location.href = res.url;
    })
    .then((data) =>{
        console.log(data);
    })

    
})

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector(".sign-up-email").value;
    const name = document.querySelector(".sign-up-name").value;
    const password = document.querySelector(".sign-up-password").value;
    const retypedPassword = document.querySelector(".sign-up-confirm-password").value;

    if (password != retypedPassword){
        alert("Passwords don't match");
        return;
    }

    fetch(`${apiUrl}/auth/signup`, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: 'same-origin',
            body: JSON.stringify({name, email, password}),
        })
        .then((res) => res.json())
        .then((data) =>{
            const {token} = data;

            if(token){
                localStorage.setItem('token', token);
                location.href = "../dashboard/dashboard.html";
            }
            else{
                alert("Signup again!");
            }
            
        })
        .catch((error) =>{
            console.log(error);
        })
})


signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector(".sign-in-email").value;

    const password = document.querySelector(".sign-in-password").value;

    console.log(email, password);

    fetch(`${apiUrl}/auth/signin`, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: 'same-origin',
            body: JSON.stringify({email, password}),
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
            const {token} = data;

            if(token){
                localStorage.setItem('token', token);
                location.href = "../dashboard/dashboard.html";
            }
            else{
                alert("Signin again!");
            }
            
        })
        .catch((error) =>{
            console.log(error);
        })
})

const forgotPassword = document.querySelector(".forgot-password");

forgotPassword.addEventListener("click",()=>{
    location.href = "/pages/forgotpassword/forgot.html";    
})