let pill = document.querySelector('.pill-panel');
let indicator = document.querySelector('.indicator');
let pillNodes = document.querySelectorAll('.pill-panel p');

for(let i=0; i<pillNodes.length;i++){
    pillNodes[i].addEventListener("click", function(){
        pill.querySelector(".active").classList.remove("active");
        pillNodes[i].classList.add("active");
        indicator.style.left= `calc(calc(calc(33% - 1px) * ${i}) + 1%)`;
    })
}