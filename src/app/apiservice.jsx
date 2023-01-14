import axios from "axios"

const httpClient = axios.create({
    baseURL: 'https://minhasf-api.herokuapp.com',
    withCredentials: true
})

class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl
    }

    static registrarToken(token) {
        if(token) {
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
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
export default ApiService
