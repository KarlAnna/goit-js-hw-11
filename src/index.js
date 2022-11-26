import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayApiService from "./pixabay-service"

// REFS
const searchForm = document.querySelector('#search-form')
const qalleryContainer = document.querySelector('.gallery')
const btn = document.querySelector('button[type=button]')

const pixabayApiService = new PixabayApiService()
searchForm.addEventListener('submit', onSearchFormSubmit)
btn.addEventListener('click', onLoadMore)

function onSearchFormSubmit(e) {
    e.preventDefault()

    pixabayApiService.query = e.currentTarget.elements.searchQuery.value
    pixabayApiService.resetPage()
    if (pixabayApiService.query !== '') {
            pixabayApiService.fetchArticles().then(hits => {
            clearContainer()
            appendMarkup(hits)
            if (pixabayApiService.appendedHits > 0) {
                loadMoreBtnVisible()
            }
            return
        })} else { Notify.failure('Please enter something') }
    
}

function onLoadMore() {
    console.log(pixabayApiService.totalHits);
    
    if (pixabayApiService.totalHits === qalleryContainer.children.length) {
        Notify.failure("We're sorry, but you've reached the end of search results.")
        return
    } else {pixabayApiService.fetchArticles().then(appendMarkup)}
    
}

function loadMoreBtnVisible() {
    btn.classList.remove('is-hidden')
}

function appendMarkup(hits) {
    const markup = hits.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return `
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${downloads}
                </p>
            </div>
        </div>
        `
    }).join('')

    qalleryContainer.insertAdjacentHTML('beforeend', markup)
}

function clearContainer() {
    qalleryContainer.innerHTML = ''
}