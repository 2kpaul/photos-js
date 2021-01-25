const apiKey = '563492ad6f91700001000001c5b0e18f0bb94decbaa22fed1fc05259';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchvalue;
let page = 1;
let fetchLink;
let currentSearch;

//events

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    currentSearch = searchvalue;
    searchPhotos(searchvalue);
})

more.addEventListener('click', loadMore);

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
        <a href="${photo.src.original}" target="_blank"><img src="${photo.src.large}" /></a>
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {

    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    const data = await fetchApi(fetchLink);

    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}`;
    const data = await fetchApi(fetchLink);

    generatePictures(data);
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();