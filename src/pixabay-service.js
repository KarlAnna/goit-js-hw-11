import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

export default class PixabayApiService {
    constructor() {
        this.searchQuery = ''
        this.page = 1
        this.key = '31541699-c12f6c65df126c6d133dd330e'
        this.appendedHits = 0
        this.totalHits = 0
    }
    
    fetchArticles() {
        const url = `https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=50`

        return axios.get(url)
            .then(res => {
                this.increasePage()
                if (res.data.totalHits == 0) {
                    return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
                }
                    this.appendedHits += res.data.hits.length
                    this.totalHits = res.data.totalHits
                    return res.data.hits
            })
            .catch(error => {
                console.log(error);
            })
    }

    increasePage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}