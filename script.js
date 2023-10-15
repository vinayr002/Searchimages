const API_key = "nDGTujf-lg0hEsmBg8gTp55GEZPxpI1wrYBe0Zte_xs";
const url = "https://api.unsplash.com/search/photos?";


const form = document.querySelector('form');
const input = document.getElementById('search-input');
const searchResult = document.querySelector('.search-result');
const showMore = document.getElementById('show-more-button');


window.addEventListener('load', () => searchImage('random'));

let inputData = "random";
let page = 1;

async function searchImage(inputData){
    const result =  await fetch(`${url}page=${page}&query=${inputData}&client_id=${API_key}`);
    const data = await result.json();
    console.log(data);
    const output = data.results;

    if(page==1){
        searchResult.innerHTML = "";
    }
    output.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("results");
        const image = document.createElement("img");
        image.src = result.urls.full;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display="block";      
    } 
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    page=1;
    inputData = input.value;
    searchImage(inputData);
});

showMore.addEventListener("click", ()=>{
    if (inputData = input.value) {
        searchImage(inputData);
    } else {
        searchImage('random');
    }
})
