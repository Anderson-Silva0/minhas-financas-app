import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://minhasf-api.herokuapp.com/'
})

class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto)
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto)
    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }
}

<<<<<<< HEAD
export default ApiService
=======
export default ApiService
>>>>>>> c1e838a609f5fbb907bec2170f5af285654c2aa9
