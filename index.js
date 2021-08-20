const body = document.querySelector("body");

window.addEventListener("load", ()=>{
    body.classList.add("visible");
})

const particles = document.querySelector("#particles-js");

// const dark = document.querySelector(".dark");

// dark.addEventListener("click", ()=>{
//     particles.classList.toggle("particles");
// })

const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', ()=>{
    console.log("change");

    document.body.classList.toggle("dark");
    console.log(body.classList);
})