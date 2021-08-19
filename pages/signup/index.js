

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
    .catch((err) =>{
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Warning!',
            text: 'Error Signing up, Try again.',
          })
    })

    
    
})

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector(".sign-up-email").value;
    const name = document.querySelector(".sign-up-name").value;
    const password = document.querySelector(".sign-up-password").value;
    const retypedPassword = document.querySelector(".sign-up-confirm-password").value;

    if (password != retypedPassword){
        Swal.fire({
            icon: 'warning',
            title: 'Passwords don\'t match',
        })
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
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`,
                  }).then(() => {
                    location.href = "/pages/dashboard/dashboard.html";
                  })
            }
            else if (data.error){
                Swal.fire({
                    icon: 'error',
                    text: `${data.error}`,
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
                Swal.fire({
                    icon: 'success',
                    title: `${data.message}`,
                  }).then(() => {
                    location.href = "/pages/dashboard/dashboard.html";
                  })

                
            }
            else if (data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Warning!',
                    text: `${data.error}`,
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

const forgotPassword = document.querySelector(".forgot-password");

forgotPassword.addEventListener("click",()=>{
    location.href = "/pages/forgotpassword/forgot.html";    
})