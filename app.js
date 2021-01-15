const apiKey = '563492ad6f91700001000001c5b0e18f0bb94decbaa22fed1fc05259';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchvalue;

//events

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    searchPhotos(searchvalue);
})

function updateInput(event) {
    searchvalue = event.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: apiKey
        }
    });

    const data = await dataFetch.json();

    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}" target="_blank">Donwload</a>
        </div>
        <img src="${photo.src.large}" /> 
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {

    const data = await fetchApi('https://api.pexels.com/v1/curated?per_page=15&page=1');

    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`);

    generatePictures(data);
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

curatedPhotos();