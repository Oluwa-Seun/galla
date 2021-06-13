// Dark Theme start 
let body = document.body;
let toggleBtn = document.querySelector('.toggle-btn');
let currentTheme = localStorage.getItem('currentTheme');

if (currentTheme) {
    body.classList.add('dark-color');
}
toggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-color');

        if (body.classList.contains('dark-color')) {
            localStorage.setItem('currentTheme', 'themeActive');
        } else {
            localStorage.removeItem('currentTheme');

        }
    })
    //Dark Theme End


// Fetching API Start !

class Galla {
    constructor() {
        this.API_KEY = '563492ad6f917000010000014c36a60acc5842b0818ec81468d81a3e';
        this.galleryDIv = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.pageIndex = 1;
        this.searchValueGlobe = '';
        this.eventHandle();

    }
    eventHandle() {
        document.addEventListener('DOMContentLoaded', () => {
            this.getImg(1);
        });
        this.searchForm.addEventListener('submit', (e) => {
            this.getSearchedImages(e);
        });
        this.loadMore.addEventListener('click', (e) => {
            this.loadMoreImages(e);
        })
    }
    async getImg(index) {
        //TODO Fix Pexel API_KEY where its needed !!
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=10`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        console.log(data);

    }
    async fetchImages(baseURL) {
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;
    }
    GenerateHTML(photos) {
        photos.forEach(photo => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
            <a href='#' data-aos>
            <img src="${photo.src.medium}">
            <h3>${photo.photographer}</h3>
            </a>
            `;
            this.galleryDIv.appendChild(item)

        })
    }
    async getSearchedImages(e) {
        this.loadMore.setAttribute('data-img', 'search');
        e.preventDefault();
        this.galleryDIv.innerHTML = '';

        const searchValue = e.target.querySelector('input').value;
        this.searchValueGlobe = searchValue;
        const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        e.target.reset();
    }

    async getMoreSearchedImages(index) {

        const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobe}&page=${index}&per_page=12`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
    }
    loadMoreImages(e) {
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img');
        if (loadMoreData === 'curated') {
            // next page for curated
            this.getImg(inddex)
        } else {
            //next  page for search
            this.getMoreSearchedImages(index);
        }
    }
}

const gallery = new Galla;


// If you made it to "inspect" congrats, send a developer money today! 
//Written with love by OSdev.